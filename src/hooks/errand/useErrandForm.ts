import {useContext, useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {launchImageLibrary} from 'react-native-image-picker';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {pathToImageFile} from '../../utils/amplify';
import {API, graphqlOperation} from 'aws-amplify';
import {createErrand} from '../../graphql/mutations';
import {GraphQLQuery} from '@aws-amplify/api';
import {Category, CreateErrandInput} from '../../API';
import {useNavigation} from '@react-navigation/native';
import useCategory from '../useCategory';
import useErrand from './useErrand';
import {UserContext} from '../../contexts/UserContext';
import {ErrandMapAddressContext} from '../../contexts/ErrandMapAddressContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BottomTabNavigateParams,
  ErrandStackParam,
} from '../../types/navigation';

const useErrandForm = ({categoryId}: {categoryId?: string}) => {
  const {categoryList} = useCategory();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ErrandStackParam & BottomTabNavigateParams>
    >();
  const {id: myId} = useContext(UserContext);
  const {markerPosition, addressDetail, initState} = useContext(
    ErrandMapAddressContext,
  );
  const {setNeedUpdate} = useErrand({needInitLoad: false});

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [isCheckedSuggestions, setCheckedSuggestions] = useState(false);
  const [selectedStartTimeType, setSelectedStartTimeType] = useState<
    'NOW' | 'RESERVATION'
  >('NOW');
  const [startTimeState, setStartTimeState] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [isVisibleTimePicker, setIsVisibleTimePicker] = useState(false);
  const [isVisibleGoSetting, setIsVisibleGoSetting] = useState(false);
  useEffect(() => {
    if (categoryId) {
      const category = categoryList.find(item => item.id === categoryId);
      if (category) {
        setSelectedCategory(category);
      }
    } else {
      setSelectedCategory(categoryList.find(item => item.name === '기타'));
    }
  }, [categoryId, categoryList]);

  const handleSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(undefined);
  };

  const handleSelectedSubCategory = (subCategory: Category) => {
    setSelectedSubCategory(subCategory);
  };

  const handleTitle = (txt: string) => setTitle(txt);

  const handleContent = (txt: string) => setContent(txt);

  const handlePrice = (p: string) => {
    if (isNaN(Number(p))) {
      return;
    }
    setPrice(p);
  };

  const handleStartTime = (e: DateTimePickerEvent, date?: Date) =>
    setStartTime(date || new Date());

  const handleCheckedSuggestions = () => {
    setCheckedSuggestions(!isCheckedSuggestions);
  };

  const handleSelectedStartTimeType = (type: 'NOW' | 'RESERVATION') => {
    setSelectedStartTimeType(type);
  };

  const uploadImages = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(granted => {
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setIsVisibleGoSetting(true);
          return;
        }
        launchImageLibrary(
          {mediaType: 'photo', selectionLimit: 10},
          async response => {
            if (response.didCancel) {
              return;
            }
            if (response.errorCode) {
              Alert.alert('Failed to get image');
              return;
            }
            if (!response.assets) {
              return;
            }
            setImageUrls(response.assets.map(asset => asset?.uri) as string[]);
          },
        );
      });
    } else {
      launchImageLibrary(
        {mediaType: 'photo', selectionLimit: 10},
        async response => {
          if (response.didCancel) {
            return;
          }
          if (response.errorCode) {
            Alert.alert('Failed to get image');
            return;
          }
          if (!response.assets) {
            return;
          }
          setImageUrls(response.assets.map(asset => asset?.uri) as string[]);
        },
      );
    }
  };

  const deleteImage = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    const errandId = uuid.v4();
    // TODO : Validation
    // TODO : IMAGE UPLOAD
    let s3ImageKeys: string[] = [];
    for (const imageUrl of imageUrls) {
      const fileName = imageUrl.split('/').pop();
      const data = await pathToImageFile(
        imageUrl,
        `errand/${errandId}/${fileName}`,
      );
      if (data?.key) {
        s3ImageKeys.push(`${data.key}`);
      }
    }
    let startTimeValue = new Date();
    if (selectedStartTimeType === 'RESERVATION') {
      startTimeValue = startTimeState;
    }
    try {
      const createErrandMutate = await API.graphql<
        GraphQLQuery<CreateErrandInput>
      >(
        graphqlOperation(createErrand, {
          input: {
            id: errandId,
            clientId: myId,
            title,
            description: content,
            price: Number(price),
            startTime: startTimeValue.toISOString(),
            categoryId: selectedCategory?.id || '',
            subCategoryId: selectedSubCategory?.id || '',
            imageUrls: s3ImageKeys,
            views: 0,
            latitude: markerPosition?.latitude || 0,
            longitude: markerPosition?.longitude || 0,
            address: addressDetail,
            status: 'PENDING',
          },
        }),
      );
      if (createErrandMutate.data) {
        setNeedUpdate(true);
        initState();
        navigation.popToTop();
        navigation.navigate('ErrandTab');
        setTimeout(() => {
          navigation.navigate('ErrandDetail', {id: errandId as string});
        }, 500);
      } else {
        Alert.alert('Failed to create errand. Try again.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to create errand');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    category: {
      categoryList,
      selectedCategory,
      handleSelectedCategory,
      selectedSubCategory,
      handleSelectedSubCategory,
    },
    title: {
      value: title,
      onChangeText: handleTitle,
    },
    content: {
      value: content,
      onChangeText: handleContent,
    },
    price: {
      value: price,
      onChangeText: handlePrice,
      isCheckedSuggestions,
      handleCheckedSuggestions,
    },
    startTime: {
      value: startTime,
      setStartTime,
      onChange: handleStartTime,
      selectedStartTimeType,
      handleSelectedStartTimeType,
      isVisibleDatePicker,
      setIsVisibleDatePicker,
      startTimeState,
      setStartTimeState,
      isVisibleTimePicker,
      setIsVisibleTimePicker,
    },
    images: {
      imageUrls,
      isVisibleGoSetting,
      uploadImages,
      deleteImage,
      setIsVisibleGoSetting,
    },
    handleSubmitForm,
    isLoading,
  };
};

export default useErrandForm;
