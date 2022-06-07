import { CreateBtn } from './createProduct/CreateBtn';
import { CreateInput } from './createProduct/CreateInput';
import { CreateSelect } from './createProduct/CreateSelect';

export const CreateProduct = ({
  changeCategory,
  changeProductType,
  categories,
  product,
  inputHandler,
  keyPressed,
  saveHandler,
  producttypes,
  loading,
  units,
  brands,
  clearInputs,
  changeBrand,
  changeUnit,
  selectRef,
}) => {
  return (
    <>
      <CreateSelect
        selectRef={selectRef}
        categories={categories}
        producttypes={producttypes}
        brands={brands}
        units={units}
        changeCategory={changeCategory}
        changeProductType={changeProductType}
        changeBrand={changeBrand}
        changeUnit={changeUnit}
        loading={loading}
      />
      <CreateInput
        keyPressed={keyPressed}
        inputHandler={inputHandler}
        product={product}
      />
      <CreateBtn
        clearInputs={clearInputs}
        saveHandler={saveHandler}
        loading={loading}
      />
    </>
  );
};
