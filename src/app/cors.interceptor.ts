import { HttpInterceptorFn } from '@angular/common/http';

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  // Aggiungi intestazioni personalizzate se necessario
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json', // Specifica il tipo di contenuto
      // Puoi aggiungere altre intestazioni se necessario
    }
  });

  return next(clonedRequest);
};
