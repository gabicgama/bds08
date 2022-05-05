import { Gender } from './types';

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const formatGender = (gender: Gender) => {
  const textByGender = {
    FEMALE: 'Feminino',
    MALE: 'Masculino',
    OTHER: 'Outro',
  };
  return textByGender[gender];
};
