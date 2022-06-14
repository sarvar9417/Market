import { t } from 'i18next';
import { CreateBtn } from './createProduct/CreateBtn';
import { CreateInput } from './createProduct/CreateInput';
// import { CreateSelect } from './createProduct/CreateSelect';

export const CreateProduct = ({
  product,
  inputHandler,
  keyPressed,
  saveHandler,
  loading,
  units,
  clearInputs,
  changeUnit,
  selectRef,
  // changeCategory,
  // changeProductType,
  // categories,
  // brands,
  // changeBrand,
  // producttypes,
}) => {
  return (
    <div className='shadow-xl m-3'>
      {/* <CreateSelect
        selectRef={selectRef}
        // categories={categories}
        // producttypes={producttypes}
        // brands={brands}
        units={units}
        // changeCategory={changeCategory}
        // changeProductType={changeProductType}
        // changeBrand={changeBrand}
        changeUnit={changeUnit}
        loading={loading}
      /> */}
      <div className='card-header text-lg'>{t("Mahsulot yaratish")}</div>
      <CreateInput
        units={units}
        loading={loading}
        changeUnit={changeUnit}
        selectRef={selectRef}
        keyPressed={keyPressed}
        inputHandler={inputHandler}
        product={product}
      />
      <CreateBtn
        clearInputs={clearInputs}
        saveHandler={saveHandler}
        loading={loading}
      />
    </div>
  );
};
