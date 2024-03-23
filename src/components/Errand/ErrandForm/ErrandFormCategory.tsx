import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShortCut from '../../Home/Shortcut';
import SubCategoryButton from '../SubCategoryButton';
import {Category} from '../../../API';
import useCategory from '../../../hooks/useCategory';
import {useTranslation} from 'react-i18next';

interface ErrandFormCategoryProps {
  firstCategoryId?: string;
  categoryList: Category[];
  selectedCategory?: Category;
  handleSelectedCategory: (category: Category) => void;
  selectedSubCategory?: Category;
  handleSelectedSubCategory: (subCategory: Category) => void;
}

const ErrandFormCategory = (props: ErrandFormCategoryProps) => {
  const {i18n, t} = useTranslation();
  const {
    firstCategoryId,
    categoryList,
    selectedCategory,
    handleSelectedCategory,
    selectedSubCategory,
    handleSelectedSubCategory,
  } = props;

  const [isVisibleChangeModal, setIsVisibleChangeModal] = useState(false);

  useEffect(() => {
    if (!firstCategoryId) {
      setIsVisibleChangeModal(true);
    }
  }, []);

  const toggleChangeModal = () => {
    setIsVisibleChangeModal(!isVisibleChangeModal);
  };

  const {convertCategoryIdToName} = useCategory();

  const subCategories = (
    selectedCategory?.subCategories
      ? JSON.parse(selectedCategory?.subCategories)
      : []
  ) as {
    id: string;
    name: string;
    nameEn: string;
    nameVi: string;
    nameKo: string;
  }[];

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.category}>
        <ShortCut
          id={selectedCategory?.id || ''}
          title={convertCategoryIdToName(selectedCategory?.id || '')}
          imageUrl={selectedCategory?.imageUrl || ''}
          onPress={toggleChangeModal}
        />
      </View>
      <Modal
        visible={isVisibleChangeModal}
        transparent={true} // Make the modal transparent
        animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={toggleChangeModal}
          />
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>{t('selectCategory')}</Text>
            </View>
            <FlatList
              data={categoryList}
              scrollEnabled={categoryList.length > 6}
              numColumns={4}
              columnWrapperStyle={{
                gap: 10,
                padding: 10,
              }}
              renderItem={({item}) => (
                <View style={styles.categoryItem} key={item.id}>
                  <ShortCut
                    id={item.id}
                    title={convertCategoryIdToName(item.id)}
                    imageUrl={item?.imageUrl || ''}
                    onPress={() => {
                      handleSelectedCategory(item as Category);
                      setIsVisibleChangeModal(false);
                    }}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={subCategories}
        scrollEnabled={subCategories.length > 6}
        numColumns={3}
        columnWrapperStyle={{
          gap: 7,
          paddingVertical: 10,
        }}
        renderItem={({item}) => {
          let title = item.name;
          switch (i18n.language) {
            case 'en':
              title = item.nameEn;
              break;
            case 'vi':
              title = item.nameVi;
              break;
            case 'ko':
              title = item.nameKo;
              break;
            default:
              title = item.name;
              break;
          }

          return (
            <SubCategoryButton
              key={item.id}
              title={title}
              onPress={() => handleSelectedSubCategory(item as Category)}
              isSelected={selectedSubCategory?.id === item.id}
            />
          );
        }}
      />
    </View>
  );
};

export default ErrandFormCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    zIndex: 11,
    marginVertical: 18,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  modalContent: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // For Android shadow
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#171717',
  },
});
