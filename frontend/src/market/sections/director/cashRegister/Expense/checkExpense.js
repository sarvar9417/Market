import { t } from 'i18next';

export const checkExpense = (expense) => {
  if (!expense.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiriting."),
      status: 'error',
    };
  if (!expense.sum)
    return {
      title: t('Diqqat! Xarajat summasi kiritilmagan.'),
      description: t('Iltimos xarajat summasi kiriting.'),
      status: 'error',
    };
  if (!expense.comment)
    return {
      title: t('Diqqat! Xarajat izohi kiritilmagan.'),
      description: t('Iltimos xarajat izohni kiriting.'),
      status: 'error',
    };
  if (!expense.type) {
    return {
      title: t('Diqqat! Xarajat turi kiritilmagan.'),
      description: t('Iltimos xarajat turini kiriting.'),
      status: 'error',
    };
  }
  return false;
};
