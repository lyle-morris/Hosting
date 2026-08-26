(function(){
  'use strict';

  function byId(id){ return document.getElementById(id); }
  function clean(value){ return String(value || '').replace(/^\s+|\s+$/g, ''); }

  function setClearButton(id){
    var input = byId(id);
    var button = byId(id + 'Clear');
    if(!input || !button) return;

    // Keep the control physically present in the Pebble WebView. Older
    // WebViews have been inconsistent about toggling the hidden attribute.
    button.removeAttribute('hidden');
    button.style.display = 'block';
    button.style.visibility = clean(input.value) ? 'visible' : 'hidden';
  }

  function syncAll(){
    setClearButton('manualCountry');
    setClearButton('manualPostalCode');
    setClearButton('manualCity');
  }

  function clearField(id){
    var field = byId(id);
    if(field) field.value = '';
    setClearButton(id);
  }

  function useCountry(){
    var country = byId('manualCountry');
    if(country && clean(country.value)) {
      clearField('manualPostalCode');
      clearField('manualCity');
    }
    syncAll();
  }

  function usePostal(){
    var postal = byId('manualPostalCode');
    if(postal && clean(postal.value)) {
      clearField('manualCountry');
      clearField('manualCity');
    }
    syncAll();
  }

  function useCity(){
    var city = byId('manualCity');
    if(city && clean(city.value)) {
      clearField('manualCountry');
      clearField('manualPostalCode');
    }
    syncAll();
  }

  function normalizeBeforeSave(){
    var postal = byId('manualPostalCode');
    var city = byId('manualCity');
    var country = byId('manualCountry');

    // Text input wins over stale dropdown state. ZIP/postal is checked first
    // because it is the most specific manual location source in this UI.
    if(postal && clean(postal.value)) {
      if(country) country.value = '';
      if(city) city.value = '';
    } else if(city && clean(city.value)) {
      if(country) country.value = '';
      if(postal) postal.value = '';
    }
    syncAll();
  }

  function bindText(id, handler){
    var field = byId(id);
    if(!field) return;
    field.addEventListener('input', handler, false);
    field.addEventListener('keyup', handler, false);
    field.addEventListener('change', handler, false);
    field.addEventListener('blur', handler, false);
  }

  var country = byId('manualCountry');
  if(country) country.addEventListener('change', useCountry, false);
  bindText('manualPostalCode', usePostal);
  bindText('manualCity', useCity);

  ['manualCountry','manualPostalCode','manualCity'].forEach(function(id){
    var button = byId(id + 'Clear');
    if(!button) return;
    button.removeAttribute('hidden');
    button.addEventListener('click', function(){
      clearField(id);
      syncAll();
    }, false);
  });

  var save = byId('saveButton');
  if(save) save.addEventListener('click', normalizeBeforeSave, true);

  syncAll();
  window.setTimeout(syncAll, 0);
  window.setTimeout(syncAll, 500);
})();
