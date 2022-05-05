import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { makeRequest } from '../../request';
import { FilterData, Store } from '../../types';
import './styles.css';

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

const Filter = ({ onSubmitFilter }: Props) => {
  const [selectStore, setSelectStore] = useState<Store[]>([]);
  const [isGetStore, setIsGetStore] = useState<Boolean>(false);
  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  useEffect(() => {
    if (!isGetStore) {
      makeRequest
        .get<Store[]>('/stores')
        .then((response) => {
          setSelectStore(response.data);
          setIsGetStore(true);
        })
        .catch((error) => {
          console.log('Erro ao tentar atualizar a lista de lojas. ' + error);
        });
    }
  });

  const onSubmit = (formData: FilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeStore = (value: Store) => {
    setValue('store', value);
    const obj: FilterData = {
      store: getValues('store'),
    };
    onSubmitFilter(obj);
  };

  return (
    <div className="filter-container base-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filter-select-container">
          <Controller
            name="store"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectStore}
                getOptionLabel={(store: Store) => store.name}
                getOptionValue={(store: Store) => String(store.id)}
                classNamePrefix="store-filter-select"
                onChange={(value) => handleChangeStore(value as Store)}
                placeholder="Selecione uma loja"
                isClearable
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
