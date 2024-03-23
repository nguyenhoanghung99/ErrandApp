import React, {PropsWithChildren} from 'react';
import useCategory from '../hooks/useCategory';
import {Category} from '../API';

export const CategoryContext = React.createContext<{categoryList: Category[]}>({
  categoryList: [],
});

const CategoryProvider = ({children}: PropsWithChildren) => {
  const {categoryList} = useCategory();

  return (
    <CategoryContext.Provider value={{categoryList}}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
