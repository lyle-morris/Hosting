(function(){
  'use strict';

  function byId(id){return document.getElementById(id);}
  function fireChange(el){if(!el)return;var ev=document.createEvent('HTMLEvents');ev.initEvent('change',true,false);el.dispatchEvent(ev);}
  function closestCard(el){while(el&&el!==document.body){if(el.classList&&el.classList.contains('card'))return el;el=el.parentNode;}return null;}
  function setText(el,value){if(el&&value)el.textContent=value;}

  var style=document.createElement('style');
  style.textContent='.input-wrap select{padding-right:84px;background-position:right 48px center}.location-reset,.language-reset{width:100%;min-height:51px}.field-clear.select-clear{right:4px;background:#000}.field-clear.select-clear+select{padding-right:84px}.location-reset{margin-top:0}';
  document.head.appendChild(style);

  var info=document.querySelector('section[aria-labelledby=informationTitle]');
  var form=info&&info.querySelector('.card-form');
  var vertical=byId('verticalLayout');
  var three=byId('threeSlots');
  if(form&&vertical&&three){
    var vLabel=vertical.closest('label');
    var tLabel=three.closest('label');
    if(vLabel&&tLabel&&!form.querySelector('.layout-toggle-group')){
      var vs=vLabel.querySelector('strong');
      var ts=tLabel.querySelector('strong');
      if(vs)vs.textContent='Vertical layout';
      if(ts)ts.textContent='3 informational slots';
      var group=document.createElement('div');
      group.className='layout-toggle-group';
      form.insertBefore(group,vLabel);
      group.appendChild(vLabel);
      group.appendChild(tLabel);
    }
  }

  function syncSlotEnd(){
    var row2=byId('slot2Metric');row2=row2&&row2.closest('.slot-row');
    var row3=byId('slot3Row');
    if(row2&&row3)row2.classList.toggle('last-visible-slot',!!row3.hidden);
  }

  var oldReset=byId('resetButton');
  var slots=info&&info.querySelector('.slots');
  if(oldReset&&slots&&!slots.querySelector('.info-reset')){
    var reset=oldReset.cloneNode(true);
    oldReset.parentNode.replaceChild(reset,oldReset);
    reset.classList.add('info-reset');
    reset.textContent='Reset layout';
    slots.appendChild(reset);
    reset.addEventListener('click',function(){
      var s1=byId('slot1Metric'),s2=byId('slot2Metric'),s3=byId('slot3Metric');
      if(vertical){vertical.checked=false;fireChange(vertical);}
      if(s1){s1.value='calendar';fireChange(s1);}
      if(s2){s2.value='weather';fireChange(s2);}
      if(s3){s3.value='battery';fireChange(s3);}
      if(three){three.checked=false;fireChange(three);}
      var status=byId('status');if(status)status.textContent='Layout reset.';
      syncSlotEnd();
    });
  }
  syncSlotEnd();
  if(three)three.addEventListener('change',function(){setTimeout(syncSlotEnd,0);});

  function addThemeReset(panel,isCustom){
    if(!panel||panel.querySelector('.theme-reset-wrap'))return;
    var wrap=document.createElement('div');wrap.className='theme-reset-wrap';
    var btn=document.createElement('button');btn.type='button';btn.className='theme-reset-button';btn.textContent='Reset theme';btn.setAttribute('data-redux-i18n','resetTheme');
    btn.addEventListener('click',function(){
      var orange=document.querySelector('.theme-choice[data-theme=orange]');
      if(!orange)return;
      orange.click();
      if(isCustom){var customTab=byId('customThemeTab');if(customTab)customTab.click();}
      var status=byId('status');if(status)status.textContent='Theme reset.';
    });
    wrap.appendChild(btn);panel.appendChild(wrap);
  }
  addThemeReset(byId('presetThemePanel'),false);
  addThemeReset(byId('customThemePanel'),true);

  var pink=document.querySelector('.theme-choice[data-theme=pink]');
  if(pink){
    if(pink.getAttribute('aria-pressed')==='true'){
      var red=document.querySelector('.theme-choice[data-theme=red]');if(red)red.click();
    }
    if(pink.parentNode)pink.parentNode.removeChild(pink);
  }

  var postal=byId('manualPostalCode');
  var postalClear=byId('manualPostalClear');
  var city=byId('manualCity');
  var country=byId('manualCountry');
  var cityClear=null;

  function updatePostalClear(){if(postalClear)postalClear.hidden=!postal.value;}
  function updateCityClear(){if(cityClear)cityClear.hidden=!city.value;}

  if(city&&city.parentNode&&!city.parentNode.classList.contains('input-wrap')){
    var cityWrap=document.createElement('div');cityWrap.className='input-wrap';
    city.parentNode.insertBefore(cityWrap,city);cityWrap.appendChild(city);
    cityClear=document.createElement('button');cityClear.type='button';cityClear.id='manualCityClear';cityClear.className='field-clear';cityClear.setAttribute('aria-label','Clear city');cityClear.textContent='×';cityClear.hidden=!city.value;cityWrap.appendChild(cityClear);
  }else if(city){
    cityClear=byId('manualCityClear');
  }

  if(postal){
    postal.addEventListener('input',function(){
      if(postal.value.trim()&&city){city.value='';updateCityClear();}
      updatePostalClear();
    });
  }
  if(city){
    city.addEventListener('input',function(){
      if(city.value.trim()&&postal){postal.value='';updatePostalClear();}
      updateCityClear();
    });
  }
  if(cityClear){
    cityClear.addEventListener('click',function(){city.value='';updateCityClear();city.focus();});
  }

  function prioritizeUnitedStates(){
    if(!country)return;
    var us=null;
    for(var i=0;i<country.options.length;i++){if(country.options[i].value==='US'){us=country.options[i];break;}}
    if(us&&country.options[0]!==us)country.insertBefore(us,country.options[0]);
    if(!country.value)country.value='US';
  }
  prioritizeUnitedStates();

  var locationCard=country&&closestCard(country);
  var locationForm=locationCard&&locationCard.querySelector('.card-form');
  if(locationForm&&!byId('resetLocationButton')){
    var resetLocation=document.createElement('button');resetLocation.type='button';resetLocation.id='resetLocationButton';resetLocation.className='button location-reset';resetLocation.textContent='Reset location';resetLocation.setAttribute('data-redux-i18n','resetLocation');
    resetLocation.addEventListener('click',function(){
      if(postal)postal.value='';if(city)city.value='';if(country)country.value='US';
      updatePostalClear();updateCityClear();prioritizeUnitedStates();
      var status=byId('status');if(status)status.textContent='Location reset to United States.';
    });
    locationForm.appendChild(resetLocation);
  }

  var language=byId('language');
  var languageClear=null;
  if(language&&language.parentNode&&!language.parentNode.classList.contains('input-wrap')){
    var languageWrap=document.createElement('div');languageWrap.className='input-wrap';
    language.parentNode.insertBefore(languageWrap,language);languageWrap.appendChild(language);
    languageClear=document.createElement('button');languageClear.type='button';languageClear.id='languageClear';languageClear.className='field-clear select-clear';languageClear.setAttribute('aria-label','Reset language to English');languageClear.textContent='×';languageWrap.appendChild(languageClear);
  }else{
    languageClear=byId('languageClear');
  }
  function updateLanguageClear(){if(languageClear&&language)languageClear.hidden=language.value==='en';}
  if(languageClear&&language){
    languageClear.addEventListener('click',function(){language.value='en';fireChange(language);language.focus();});
  }

  var I18N=null;
  function extractEssentialI18n(source){
    try{
      var start=source.indexOf('var I18N=');
      var end=source.indexOf('var gaLoading',start);
      if(start<0||end<0)return null;
      var script=source.substring(start,end);
      return Function(script+';return I18N;')();
    }catch(error){return null;}
  }

  function applyLocale(code){
    code=code||'en';
    document.documentElement.lang=code;
    var t=I18N&&(I18N[code]||I18N.en);
    if(!t){updateLanguageClear();return;}

    var heading=document.querySelector('.page-heading p');setText(heading,t.intro);
    setText(byId('informationTitle'),t.metricsTitle);
    if(info){var copy=info.querySelector('.card-copy');setText(copy,t.metricsCopy);}
    var general=byId('generalTitle');setText(general,t.settingsTitle);
    var leading=byId('leadingZero');if(leading)setText(leading.closest('label').querySelector('strong'),t.leadingZero);
    var hour=byId('hour12');if(hour)setText(hour.closest('label').querySelector('strong'),t.hour12);
    var celsius=byId('celsius');if(celsius)setText(celsius.closest('label').querySelector('strong'),t.celsius);
    var bluetooth=byId('bluetooth');if(bluetooth)setText(bluetooth.closest('label').querySelector('strong'),t.bluetooth);
    var battery=byId('batteryIndicator');if(battery)setText(battery.closest('label').querySelector('strong'),t.batteryIndicator);
    setText(byId('presetThemeTab'),t.themeTab);setText(byId('customThemeTab'),t.customTab);
    if(locationCard){var title=locationCard.querySelector('.card-title');setText(title,t.locationTitle);var labels=locationCard.querySelectorAll('.field-label');if(labels[0])setText(labels[0],t.countryLabel);if(labels[1])setText(labels[1],t.postalLabel);if(labels[2])setText(labels[2],t.cityLabel);}
    var languageCard=language&&closestCard(language);if(languageCard){var lt=languageCard.querySelector('.card-title');setText(lt,t.languageLabel);var lc=languageCard.querySelector('.card-copy');setText(lc,t.languageCopy);}
    var analytics=byId('analytics');var analyticsCard=analytics&&closestCard(analytics);if(analyticsCard){setText(analyticsCard.querySelector('.card-title'),t.analyticsTitle);var ac=analyticsCard.querySelector('.card-copy');setText(ac,t.analyticsCopy);}
    var supportTitle=document.querySelector('[aria-labelledby=supportTitle] .card-title');setText(supportTitle,t.supportTitle);
    var supportCard=supportTitle&&closestCard(supportTitle);if(supportCard){setText(supportCard.querySelector('.card-copy'),t.supportCopy);var link=supportCard.querySelector('a');setText(link,t.donate);}
    var infoReset=document.querySelector('.info-reset');setText(infoReset,t.reset);
    setText(byId('saveButton'),t.save);

    if(t.metrics){
      ['slot1Metric','slot2Metric','slot3Metric'].forEach(function(id){var select=byId(id);if(!select)return;for(var i=0;i<select.options.length;i++){var value=select.options[i].value;var order={calendar:0,weather:1,battery:2,calories:3,activity:4,sleep:5,heart:6,steps:7,distance:8};if(order[value]!==undefined&&t.metrics[order[value]])select.options[i].text=t.metrics[order[value]];}});
    }
    if(t.themes){
      var themeOrder={orange:0,blue:1,purple:2,yellow:3,green:4,red:5,white:6,black:7};
      Array.prototype.forEach.call(document.querySelectorAll('.theme-choice'),function(choice){var idx=themeOrder[choice.dataset.theme];var swatch=choice.querySelector('.theme-choice-swatch');if(idx!==undefined&&swatch&&t.themes[idx])swatch.textContent=t.themes[idx];});
    }
    updateLanguageClear();
  }

  function loadLocalization(){
    var xhr=new XMLHttpRequest();
    xhr.open('GET','../../essential-redux/qa/app-config.html?i18n=redux-v11-20260828',true);
    xhr.onload=function(){if(xhr.status>=200&&xhr.status<300)I18N=extractEssentialI18n(xhr.responseText||'');applyLocale(language?language.value:'en');};
    xhr.onerror=function(){applyLocale(language?language.value:'en');};
    xhr.send();
  }

  if(language){
    language.addEventListener('change',function(){applyLocale(language.value);});
    updateLanguageClear();
  }
  updatePostalClear();updateCityClear();
  loadLocalization();

  var save=byId('saveButton');if(save)save.textContent='Save settings';
  var headingTitle=document.querySelector('.page-heading h1');if(headingTitle)headingTitle.textContent='Redux';
  document.documentElement.setAttribute('data-redux-config','v11-location-language');
}());
