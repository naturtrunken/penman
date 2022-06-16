import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppVarsService {

  // We need the language in each HTTP request. The HTTP request interceptor
  // needs them. We cannot add the TranslationService there due to a circular
  // dependency. Therefore, we have to store the current language here.
  // DO NOT use this variable if you can also use the TranslationService!
  public currentLanguage = 'de';
  public currentUser = {
    id: '',
    email: ''
  };

  constructor() { }
}
