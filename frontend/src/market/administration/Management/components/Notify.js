import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

export const Notify = () => {
  const toast = useToast();

  const notify = useCallback(
    (data) => {
      toast({
        title: data.title && data.title,
        description: data.description && data.description,
        status: data.status && data.status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [toast]
  );
  return { notify };
};
