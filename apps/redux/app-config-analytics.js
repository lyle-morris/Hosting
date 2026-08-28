(function(){
  'use strict';

  var GA_ID='G-37VYMTXT5S';
  var APP_NAME='Redux';
  var APP_VERSION='2.1.2';
  var gaLoading=false;
  var gaLoaded=false;

  function byId(id){return document.getElementById(id);}
  function enabled(){var el=byId('analytics');return !!(el&&el.checked);}
  function value(id,fallback){var el=byId(id);return el&&el.value!==undefined?el.value:(fallback||'');}
  function checked(id){var el=byId(id);return !!(el&&el.checked);}

  function loadGA(){
    if(gaLoaded||gaLoading||!enabled())return;
    gaLoading=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    var script=document.createElement('script');
    script.async=true;
    script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);
    script.onload=function(){
      gaLoading=false;
      gaLoaded=true;
      window.gtag('js',new Date());
      window.gtag('config',GA_ID,{
        send_page_view:true,
        page_title:'Redux Settings',
        app_name:APP_NAME,
        app_version:APP_VERSION
      });
      window.gtag('event','config_open',{
        app_name:APP_NAME,
        app_version:APP_VERSION,
        transport_type:'beacon'
      });
    };
    script.onerror=function(){gaLoading=false;};
    document.head.appendChild(script);
  }

  function track(name,data,tries){
    if(!enabled())return;
    data=data||{};
    data.app_name=APP_NAME;
    data.app_version=APP_VERSION;
    data.transport_type='beacon';
    if(gaLoaded&&window.gtag){window.gtag('event',name,data);return;}
    loadGA();
    if((tries||0)<12)setTimeout(function(){track(name,data,(tries||0)+1);},250);
  }

  function selectedTheme(){
    var selected=document.querySelector('.theme-choice[aria-pressed="true"]');
    return selected&&selected.dataset?selected.dataset.theme:'';
  }

  function themeMode(){
    var custom=byId('customThemePanel');
    return custom&&!custom.hidden?'custom':'preset';
  }

  function themeUsage(){
    var mode=themeMode();
    return {
      theme:mode==='custom'?'custom':selectedTheme(),
      theme_mode:mode
    };
  }

  function settingsSnapshot(){
    var usage=themeUsage();
    return {
      theme:usage.theme,
      theme_mode:usage.theme_mode,
      language:value('language','en'),
      use_24_hour:checked('hour12')?0:1,
      leading_zero:checked('leadingZero')?1:0,
      battery_indicator:checked('batteryIndicator')?1:0,
      bluetooth:checked('bluetooth')?1:0,
      use_celsius:checked('celsius')?1:0,
      manual_location:(value('manualPostalCode','').trim()||value('manualCity','').trim())?1:0,
      orientation:checked('verticalLayout')?'vertical':'horizontal',
      slot_count:checked('threeSlots')?3:2,
      slot1_metric:value('slot1Metric',''),
      slot2_metric:value('slot2Metric',''),
      slot3_metric:checked('threeSlots')?value('slot3Metric',''):'none'
    };
  }

  var analytics=byId('analytics');
  if(analytics){
    analytics.addEventListener('change',function(){
      if(this.checked){loadGA();track('analytics_enabled',{source:'app_config'});}
    });
  }

  var save=byId('saveButton');
  if(save)save.addEventListener('click',function(){
    var snapshot=settingsSnapshot();
    track('settings_saved',snapshot);
    track('theme_used',{
      theme:snapshot.theme,
      theme_mode:snapshot.theme_mode,
      orientation:snapshot.orientation,
      slot_count:snapshot.slot_count
    });
  },true);

  var reset=document.querySelector('.info-reset');
  if(reset)reset.addEventListener('click',function(){track('layout_reset',{source:'app_config'});},true);

  var support=document.querySelector('section[aria-labelledby="supportTitle"] a');
  if(support)support.addEventListener('click',function(){track('donation_clicked',{source:'app_config'});},true);

  Array.prototype.forEach.call(document.querySelectorAll('.theme-choice'),function(choice){
    choice.addEventListener('click',function(){
      track('theme_selected',{theme:choice.dataset.theme||'',theme_mode:'preset'});
    },true);
  });

  var vertical=byId('verticalLayout');
  if(vertical)vertical.addEventListener('change',function(){track('layout_changed',{orientation:this.checked?'vertical':'horizontal',slot_count:checked('threeSlots')?3:2});});
  var three=byId('threeSlots');
  if(three)three.addEventListener('change',function(){track('layout_changed',{orientation:checked('verticalLayout')?'vertical':'horizontal',slot_count:this.checked?3:2});});

  if(enabled())loadGA();
  document.documentElement.setAttribute('data-redux-analytics','ga4');
}());
