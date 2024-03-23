import {API, graphqlOperation} from 'aws-amplify';
import React from 'react';
import {Category, ListCategoriesQuery} from '../API';
import {listCategories} from '../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {useTranslation} from 'react-i18next';

const useCategory = () => {
  const {i18n} = useTranslation();
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);

  const [isLoading, setLoading] = React.useState<boolean>(false);

  const getCategoryList = async () => {
    setLoading(true);
    try {
      const categoryItemList = (await API.graphql<ListCategoriesQuery>(
        graphqlOperation(listCategories, {limit: 1000}),
      )) as GraphQLResult<ListCategoriesQuery>;

      setCategoryList(
        categoryItemList.data?.listCategories?.items as Category[],
      );
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  React.useEffect(() => {
    getCategoryList();
  }, []);

  const convertCategoryIdToName = (categoryId: string) => {
    const category = categoryList.find(cate => cate.id === categoryId);
    switch (i18n.language) {
      case 'en':
        return category?.nameEn || '';
      case 'vi':
        return category?.nameVi || '';
      case 'ko':
        return category?.nameKo || '';
      default:
        return category?.name || '';
    }
  };

  const getCategoryImage = (categoryId: string) => {
    const category = categoryList.find(cate => cate.id === categoryId);
    return category?.imageUrl || '';
  };

  return {
    categoryList,
    isLoading,
    convertCategoryIdToName,
    getCategoryImage,
  };
};

export default useCategory;
