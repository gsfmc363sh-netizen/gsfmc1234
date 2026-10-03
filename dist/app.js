/* 광산 생활배출 길잡이: 사진은 브라우저에서만 분석합니다. */
const $ = (id) => document.getElementById(id);
const itemGuides = [
  { id:"umbrella", name:"우산", aliases:["양산"], kind:"일반쓰레기 / 재활용", materials:["살대 분리 가능","분리 어려움"], defaultMaterial:0, steps:[
    ["원단", "살대에서 분리", "젖은 원단을 말리고 분리해 종량제봉투에 넣으세요."],
    ["금속 살대", "금속류로 분리", "금속 부분을 안전하게 묶어 캔·고철류 배출 기준을 확인하세요."],
    ["손잡이", "재질 확인", "플라스틱이면 재활용 가능 여부를 확인하고, 혼합재질이면 종량제봉투에 넣으세요."]],
    variants:{1:[["우산 전체", "분리 어려운 경우", "끝이 날카롭지 않게 감싸고 지역의 종량제·대형폐기물 기준을 확인하세요."]]}, warning:"우산은 재질이 섞여 있어 통째로 재활용품에 넣지 마세요.", model:["umbrella"] },
  { id:"toothbrush", name:"칫솔", aliases:["치솔","전동칫솔"], kind:"일반쓰레기 / 별도배출", materials:["일반 칫솔","전동 칫솔"], defaultMaterial:0, steps:[["칫솔", "종량제봉투", "플라스틱 손잡이와 칫솔모를 분리하기 어렵다면 일반쓰레기로 배출하세요."]], variants:{1:[["전지·배터리", "별도 분리", "분리 가능한 전지는 폐건전지 수거함에 배출하세요."],["본체", "소형 폐가전", "전동 본체는 소형 폐가전 수거 기준을 확인하세요."]]}, warning:"전동 제품의 배터리를 일반쓰레기에 버리지 마세요.", model:["toothbrush"] },
  { id:"powerbank", name:"보조배터리", aliases:["파워뱅크","휴대용 충전기"], kind:"별도배출", steps:[["본체", "폐배터리 수거", "충전 단자를 절연테이프로 가리고 폐배터리 전용 수거함이나 지정 수거처에 내세요."]], warning:"화재 위험이 있으므로 종량제봉투와 일반 재활용품에 넣지 마세요.", model:["battery","power bank"] },
  { id:"pot", name:"깨진 화분", aliases:["화분","도자기 화분"], kind:"별도배출 / 일반쓰레기", materials:["도자기·사기","플라스틱"], defaultMaterial:0, steps:[["흙·식물", "먼저 분리", "흙과 식물은 화분에서 빼고 지역별 처리 기준을 확인하세요."],["깨진 도자기", "불연성 폐기물", "신문지 등으로 감싸고 불연성 마대 또는 지역 지정 방식으로 배출하세요."]], variants:{1:[["흙·식물", "먼저 분리", "화분에서 흙과 식물을 분리하세요."],["플라스틱 화분", "상태 확인", "깨끗하고 단일 재질이면 플라스틱 분리배출 기준을 확인하세요. 파손·오염된 경우 종량제봉투 기준을 확인하세요."]]}, warning:"깨진 조각에 다치지 않도록 포장하세요. 큰 화분은 대형폐기물 신고가 필요할 수 있습니다.", model:["flowerpot","pot"] },
  { id:"toy", name:"장난감", aliases:["완구","인형"], kind:"일반쓰레기 / 별도배출", materials:["배터리 있음","배터리 없음"], defaultMaterial:0, steps:[["배터리", "반드시 분리", "전지를 빼서 폐건전지 전용 수거함에 넣으세요."],["본체", "재질별 확인", "전자부품이 있으면 소형 폐가전 수거 기준을 확인하고, 혼합재질은 종량제·대형폐기물 기준을 확인하세요."]], variants:{1:[["본체", "재질별 확인", "작은 혼합재질 장난감은 종량제봉투, 큰 제품은 대형폐기물 기준을 확인하세요."]]}, warning:"부피가 크거나 전자부품이 있으면 배출 방식이 달라질 수 있습니다.", model:["toy","teddy bear","doll"] },
  { id:"pan", name:"프라이팬", aliases:["후라이팬","팬","냄비"], kind:"재활용 / 일반쓰레기", materials:["손잡이 분리 가능","분리 어려움"], defaultMaterial:0, steps:[["금속 몸체", "고철류", "음식물·기름을 닦고 금속류로 배출하세요."],["손잡이", "분리 배출", "플라스틱·나무 손잡이는 분리해 종량제봉투에 넣으세요."]], variants:{1:[["프라이팬", "지역 기준 확인", "손잡이 분리가 어려우면 고철류 수거 가능 여부를 확인하세요. 불가하면 종량제·대형폐기물 기준을 따르세요."]]}, warning:"코팅이 심하게 벗겨졌거나 비금속 부품이 많다면 수거 기준을 확인하세요.", model:["frying pan","wok","pan"] },
  { id:"tumbler", name:"텀블러", aliases:["보온병","보냉병"], kind:"재활용 / 일반쓰레기", materials:["금속 본체","플라스틱 본체"], defaultMaterial:0, steps:[["본체", "내용물 비우기", "깨끗이 헹구고 금속류 배출 기준을 확인하세요."],["뚜껑·패킹", "분리", "플라스틱 뚜껑과 고무 패킹을 분리하세요. 패킹은 종량제봉투에 넣으세요."]], variants:{1:[["본체·뚜껑", "재질별 분리", "내용물을 비우고 플라스틱 단일 재질이면 플라스틱으로 배출하세요."],["고무 패킹", "일반쓰레기", "패킹을 빼서 종량제봉투에 넣으세요."]]}, warning:"재질이 결합되어 분리되지 않는 제품은 지역 수거 기준을 확인하세요.", model:["water bottle","vacuum flask","cup"] },
  { id:"cable", name:"전선", aliases:["케이블","충전선","전기선"], kind:"별도배출", steps:[["전선", "소형 폐가전 수거", "길게 묶어 소형 폐가전 수거함 또는 지정 회수처에 배출하세요."],["어댑터", "함께 확인", "어댑터가 붙어 있으면 소형 폐가전으로 함께 처리하세요."]], warning:"전선을 태우거나 껍질을 벗기지 마세요.", model:["electric cord","cable","power cord"] },
  { id:"spray", name:"스프레이통", aliases:["스프레이 캔","에어로졸"], kind:"재활용 / 별도배출", materials:["내용물 비움","내용물 남음"], defaultMaterial:0, steps:[["내용물", "완전히 사용", "통풍이 잘 되는 곳에서 제품 설명에 따라 내용물을 모두 사용하세요."],["뚜껑·캔", "분리", "플라스틱 뚜껑을 떼고 금속 캔 배출 기준을 확인하세요."]], variants:{1:[["남은 내용물", "임의 배출 금지", "내용물이 남아 있으면 지역 지정 수거처나 제조사 안내를 확인하세요."]]}, warning:"불 가까이에서 처리하거나 무리하게 구멍을 뚫지 마세요.", model:["aerosol","spray can"] },
  { id:"delivery", name:"배달용기", aliases:["플라스틱 용기","음식 용기","일회용 용기"], kind:"재활용 / 일반쓰레기", materials:["깨끗이 씻을 수 있음","오염이 남음"], defaultMaterial:0, steps:[["남은 음식", "비우기", "내용물을 음식물 또는 일반쓰레기 기준에 맞게 먼저 분리하세요."],["용기", "헹구기", "기름기와 이물질을 씻고 플라스틱 표시와 재질을 확인해 배출하세요."],["뚜껑·비닐", "따로 분리", "서로 다른 재질은 나누고 비닐은 깨끗할 때만 해당 기준에 맞게 배출하세요."]], variants:{1:[["오염된 용기", "일반쓰레기", "씻어도 음식물·기름이 남으면 종량제봉투에 넣으세요."]]}, warning:"검은색, 복합재질 등 선별이 어려운 용기는 지역 수거 기준을 확인하세요.", model:["plastic container","takeout","food container","tray"] }
];

// 공단에서 자료를 받으면 이 배열에 정규화해 연결합니다.
const regionGroups = [];
const stores = [];
const dayNames=["일","월","화","수","목","금","토"];
let selectedGuide=null, selectedMaterial=0, imageUrl=null, aiModel=null, userCoords=null, selectedStore=0;

const viewIds=["home","photo","schedule","stores"];
function openSection(section,updateHistory=true){
  if(!viewIds.includes(section))section="home";
  document.querySelectorAll(".app-view").forEach(view=>{view.hidden=view.id!==section});
  document.querySelectorAll(".bottom-nav [data-open]").forEach(button=>button.classList.toggle("active",button.dataset.open===section));
  const active=document.getElementById(section);if(active)active.scrollTop=0;
  document.body.dataset.view=section;
  if(updateHistory&&location.hash!==`#${section}`)history.pushState({view:section},"",`#${section}`);
}
document.querySelectorAll("[data-open]").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();openSection(button.dataset.open)}));
window.addEventListener("popstate",()=>openSection(location.hash.slice(1)||"home",false));
openSection(location.hash.slice(1)||"home",false);

function guideById(id){return itemGuides.find(item=>item.id===id)}
function setGuide(id, origin="직접 선택"){
  const item=guideById(id); if(!item)return;
  selectedGuide=item;selectedMaterial=item.defaultMaterial||0;
  renderGuide(origin);$("result-panel").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderGuide(origin){
  const item=selectedGuide;if(!item)return;
  const steps=(item.variants&&item.variants[selectedMaterial])||item.steps;
  const materialHtml=item.materials?`<div class="material-check"><strong>어떤 형태인가요? 재질·상태를 선택해 주세요.</strong>${item.materials.map((label,i)=>`<button type="button" class="chip ${i===selectedMaterial?"active":""}" data-material="${i}">${label}</button>`).join("")}</div>`:"";
  $("result-panel").innerHTML=`<div class="result-top"><div><p>${origin} · 예상 품목명</p><h3>${item.name}</h3><p>사진만으로 재질을 확정할 수 없으니 실제 물건을 확인해 주세요.</p></div><div class="result-badges"><span class="badge">배출 구분 · ${item.kind}</span><span class="badge gray">재질별 분리</span></div></div>${materialHtml}<div class="guide-steps">${steps.map(([part,title,desc],i)=>`<div class="guide-step"><small>${String(i+1).padStart(2,"0")} · ${part}</small><strong>${title}</strong><p>${desc}</p></div>`).join("")}</div><p class="result-warning"><strong>주의사항</strong> · ${item.warning}</p>`;
  $("result-panel").hidden=false;
  $("result-panel").querySelectorAll("[data-material]").forEach(btn=>btn.addEventListener("click",()=>{selectedMaterial=Number(btn.dataset.material);renderGuide(origin)}));
}
function renderPopular(){ $("popular-list").innerHTML=itemGuides.map(item=>`<button class="chip" type="button" data-guide="${item.id}">${item.name}</button>`).join(""); $("popular-list").querySelectorAll("[data-guide]").forEach(button=>button.addEventListener("click",()=>setGuide(button.dataset.guide))); }
renderPopular();
$("item-search").addEventListener("input",event=>{
  const term=event.target.value.trim().toLowerCase(); const box=$("search-results");
  if(!term){box.hidden=true;box.innerHTML="";return}
  const matches=itemGuides.filter(item=>[item.name,...item.aliases].some(name=>name.toLowerCase().includes(term))).slice(0,8);
  box.innerHTML=matches.length?matches.map(item=>`<button type="button" class="search-result" data-guide="${item.id}">${item.name}</button>`).join(""):`<p class="muted-note">일치하는 품목이 없어요. 재질이나 용도로 다시 검색해 주세요.</p>`;
  box.hidden=false;box.querySelectorAll("[data-guide]").forEach(btn=>btn.addEventListener("click",()=>setGuide(btn.dataset.guide)));
});

function setPhoto(file){
  if(!file||!file.type.startsWith("image/")){ $("ai-status").textContent="이미지 파일을 선택해 주세요.";return }
  if(imageUrl)URL.revokeObjectURL(imageUrl); imageUrl=URL.createObjectURL(file);
  $("preview-img").src=imageUrl;$("image-preview").hidden=false;$("upload-empty").hidden=true;
  $("candidate-area").hidden=true;$("ai-status").textContent="사진을 분석하고 있어요. 처음에는 모델을 불러오는 데 시간이 걸릴 수 있습니다.";
  $("preview-img").onload=()=>analysePhoto();
}
$("camera-input").addEventListener("change",e=>setPhoto(e.target.files?.[0]));
$("upload-input").addEventListener("change",e=>setPhoto(e.target.files?.[0]));
$("remove-photo").addEventListener("click",()=>{if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=null;$("preview-img").removeAttribute("src");$("image-preview").hidden=true;$("upload-empty").hidden=false;$("candidate-area").hidden=true;$("ai-status").textContent="";$("camera-input").value="";$("upload-input").value=""});
const drop=$("drop-zone");["dragenter","dragover"].forEach(name=>drop.addEventListener(name,e=>{e.preventDefault();drop.classList.add("dragover")}));["dragleave","drop"].forEach(name=>drop.addEventListener(name,e=>{e.preventDefault();drop.classList.remove("dragover")}));drop.addEventListener("drop",e=>setPhoto(e.dataTransfer.files?.[0]));
async function analysePhoto(){
  const currentUrl=imageUrl;
  try{
    if(!window.tf||!window.mobilenet)throw new Error("model scripts unavailable");
    if(!aiModel)aiModel=await window.mobilenet.load({version:2,alpha:1.0});
    if(currentUrl!==imageUrl)return;
    const predictions=await aiModel.classify($("preview-img"),5);
    if(currentUrl!==imageUrl)return;
    const matches=[];
    for(const prediction of predictions){
      for(const item of itemGuides){if(item.model.some(word=>prediction.className.toLowerCase().includes(word))&&!matches.some(match=>match.id===item.id))matches.push({id:item.id,score:prediction.probability});}
    }
    matches.sort((a,b)=>b.score-a.score);
    if(matches.length&&matches[0].score>=0.18){
      $("candidate-list").innerHTML=matches.slice(0,4).map(match=>`<button class="chip" type="button" data-guide="${match.id}">${guideById(match.id).name}</button>`).join("");
      $("candidate-area").hidden=false;$("candidate-list").querySelectorAll("[data-guide]").forEach(btn=>btn.addEventListener("click",()=>setGuide(btn.dataset.guide,"AI 사진 추정")));
      $("ai-status").textContent="사진에서 비슷한 품목을 찾았어요. 실제 물건과 맞는지 선택해 주세요.";
    }else{$("ai-status").textContent="사진만으로 품목을 확실히 구분하기 어려워요. 아래에서 물건 이름을 검색하거나 비슷한 품목을 골라주세요."}
  }catch(error){$("ai-status").textContent="사진 분석 모델을 불러오지 못했어요. 아래에서 품목을 직접 선택해 주세요. 인터넷 연결을 확인한 뒤 다시 시도할 수 있습니다."}
}

function koreaDay(date){const name=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Seoul",weekday:"short"}).format(date);return {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[name]}
function nextDay(days,from){for(let i=1;i<=7;i++){const date=new Date(from.getTime()+i*86400000);if(days.includes(koreaDay(date)))return {date,offset:i}}return null}
function dayLabel(date){return new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",month:"numeric",day:"numeric",weekday:"short"}).format(date)}
function fixedHoliday(date){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Seoul",month:"2-digit",day:"2-digit"}).formatToParts(date);
  const month=parts.find(part=>part.type==="month")?.value,day=parts.find(part=>part.type==="day")?.value;
  return ["01-01","03-01","05-05","06-06","08-15","10-03","10-09","12-25"].includes(`${month}-${day}`);
}
function renderSchedule(){
  const area=$("dong-select").value;const group=regionGroups.find(g=>g.areas.includes(area));
  if(!group){$("schedule-empty").hidden=false;$("schedule-results").hidden=true;return}
  const now=new Date(),today=koreaDay(now),holiday=fixedHoliday(now);const types=[{name:"생활쓰레기",days:group.days.general,detail:"규격 종량제봉투"},{name:"음식물쓰레기",days:group.days.food,detail:"전용 수거통과 스티커"},{name:"재활용품",days:group.days.recycle,detail:"깨끗이 분리해 투명봉투 등에 배출"}];
  const todayItems=types.filter(t=>t.days.includes(today)).map(t=>t.name);
  $("schedule-results").innerHTML=`<div class="schedule-banner"><span>${area} · ${group.title} · 정기 일정 기준</span><strong>${holiday?"오늘은 공휴일 · 수거 여부 확인 필요":todayItems.length?`오늘 배출 가능 · ${todayItems.join(" · ")}`:"오늘 정기 배출 품목이 없어요"}</strong><p>${holiday?"정기 요일과 별도로 공단의 공휴일 운영 안내를 확인해 주세요.":"배출 시간 참고: 오후 8시부터 다음 날 오전 6시까지 · 공휴일과 현장 운영 변경은 별도 확인"}</p></div><div class="schedule-items">${types.map(type=>{const due=nextDay(type.days,now);return `<div class="schedule-item"><strong>${type.name}</strong><span class="${type.days.includes(today)?"today":"next"}">${type.days.includes(today)?holiday?"정기 요일상 오늘 · 확인 필요":"오늘 배출 가능":due?.offset===1?"내일 배출":`다음 배출 · ${dayLabel(due.date)}`}</span><p>정기 요일: ${type.days.map(d=>dayNames[d]).join(" · ")}<br>${type.detail}</p></div>`}).join("")}</div>`;
  $("schedule-empty").hidden=true;$("schedule-results").hidden=false;
  try{localStorage.setItem("gwangsan-area",area)}catch{}
}
const areaNames=regionGroups.flatMap(group=>group.areas).sort((a,b)=>a.localeCompare(b,"ko"));
$("dong-select").innerHTML=areaNames.length?'<option value="">동 또는 지역을 선택하세요</option>'+areaNames.map(area=>`<option value="${area}">${area}</option>`).join(""):'<option value="">수거 일정 자료 연결 전</option>';
$("dong-select").disabled=!areaNames.length;
$("dong-address-input").disabled=!areaNames.length;
$("dong-address-button").disabled=!areaNames.length;
$("dong-select").addEventListener("change",()=>{$("dong-message").textContent="";renderSchedule()});
$("date-label").textContent=new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",year:"numeric",month:"long",day:"numeric",weekday:"long"}).format(new Date());
try{const saved=localStorage.getItem("gwangsan-area");if(saved&&areaNames.includes(saved)){$("dong-select").value=saved;renderSchedule()}}catch{}
$("dong-address-button").addEventListener("click",()=>{
  const raw=$("dong-address-input").value.replace(/\s/g,"");
  const aliases={"수완동":"수완지구","선운동":"선운지구","하남동":"하남2지구"};
  const area=areaNames.find(name=>raw.includes(name))||Object.entries(aliases).find(([key])=>raw.includes(key))?.[1];
  if(area){$("dong-select").value=area;$("dong-message").textContent=`${area} 정기 일정을 표시합니다. 세부 구역은 공단 노선을 확인해 주세요.`;renderSchedule()}else{$("dong-message").textContent="주소에서 동 이름을 찾지 못했어요. 위 목록에서 동이나 지역을 선택해 주세요."}
});
$("dong-address-input").addEventListener("keydown",e=>{if(e.key==="Enter")$("dong-address-button").click()});

function haversine(a,b){const rad=x=>x*Math.PI/180;const dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon);const h=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))}
function formatDistance(km){return km<1?`${Math.round(km*1000)}m`:`${km.toFixed(1)}km`}
let geocodeQueue=Promise.resolve(),nextGeocodeAt=0;
async function geocode(query){
  const cacheKey=`geo:${query}`;
  try{const stored=localStorage.getItem(cacheKey);if(stored)return JSON.parse(stored)}catch{}
  const task=geocodeQueue.then(async()=>{
    const wait=Math.max(0,nextGeocodeAt-Date.now());if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
    nextGeocodeAt=Date.now()+1200;
    const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=kr&accept-language=ko&q=${encodeURIComponent(query)}`;
    const response=await fetch(url,{headers:{"Accept":"application/json"}});if(!response.ok)throw new Error("geocoder unavailable");
    const data=await response.json();if(!data.length)return null;
    const point={lat:Number(data[0].lat),lon:Number(data[0].lon)};
    try{localStorage.setItem(cacheKey,JSON.stringify(point))}catch{}
    return point;
  });
  geocodeQueue=task.catch(()=>{});
  return task;
}
function renderStores(){
  if(!stores.length){
    document.querySelector(".store-layout")?.classList.add("data-empty");
    const mapPanel=document.querySelector(".map-panel");if(mapPanel)mapPanel.hidden=true;
    $("store-list").innerHTML='<div class="empty-state"><span class="empty-icon" aria-hidden="true">⌖</span><strong>판매소 데이터 연결 준비 중</strong><span>판매소명과 주소 자료를 받으면<br>가까운 순으로 보여드릴게요.</span></div>';
    return;
  }
  const ordered=[...stores].map((store,index)=>({...store,index,distance:userCoords&&store.coords?haversine(userCoords,store.coords):null}));
  if(userCoords)ordered.sort((a,b)=>(a.distance??Infinity)-(b.distance??Infinity));
  $("store-list").innerHTML=ordered.map(store=>`<button type="button" class="store-card ${selectedStore===store.index?"active":""}" data-store="${store.index}"><span><strong>${store.name}</strong><span>${store.address}</span><span>봉투 종류 · 판매소에 확인 필요</span></span><em>${store.distance==null?"지도 보기":formatDistance(store.distance)}</em></button>`).join("");
  $("store-list").querySelectorAll("[data-store]").forEach(btn=>btn.addEventListener("click",()=>selectStore(Number(btn.dataset.store))));
}
function selectStore(index){
  const store=stores[index];if(!store)return;
  selectedStore=index;$("map-store-name").textContent=store.name;$("map-address").textContent=store.address;
  $("store-map").src=`https://www.google.com/maps?q=${encodeURIComponent(store.address)}&output=embed`;
  $("map-placeholder").hidden=true;
  $("map-directions").href=`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`;
  $("map-directions").hidden=false;renderStores();
}
async function geocodeStores(){
  if(!stores.length)return;
  for(const store of stores){try{store.coords=await geocode(store.address)}catch{}renderStores()}
  if(userCoords&&!stores.some(s=>s.coords))$("location-status").textContent="거리 계산 서비스를 사용할 수 없어요. 주소와 지도를 확인해 주세요.";
}
$("use-location").addEventListener("click",()=>{
  if(!navigator.geolocation){$("location-status").textContent="이 기기에서는 위치를 사용할 수 없어요. 주소를 입력해 주세요.";return}
  $("location-status").textContent="현재 위치를 확인하고 있어요…";
  navigator.geolocation.getCurrentPosition(position=>{userCoords={lat:position.coords.latitude,lon:position.coords.longitude};$("location-status").textContent="현재 위치 기준 거리순으로 정렬했어요. 거리는 직선거리입니다.";renderStores()},()=>{$("location-status").textContent="위치 권한을 사용할 수 없어요. 주소를 입력해 주세요."},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
});
$("search-address").addEventListener("click",async()=>{
  const value=$("address-input").value.trim();if(!value){$("location-status").textContent="광산구 주소나 동 이름을 입력해 주세요.";return}
  $("location-status").textContent="주소 위치를 찾고 있어요…";
  try{const coords=await geocode(`광주광역시 광산구 ${value}`);if(!coords){$("location-status").textContent="주소를 찾지 못했어요. 더 자세한 도로명주소로 다시 입력해 주세요.";return}userCoords=coords;$("location-status").textContent="입력한 주소 기준 거리순으로 정렬했어요. 거리는 직선거리입니다.";renderStores()}catch{$("location-status").textContent="주소 검색 서비스를 사용할 수 없어요. 목록의 주소와 지도를 확인해 주세요."}
});
$("address-input").addEventListener("keydown",e=>{if(e.key==="Enter")$("search-address").click()});
$("use-location").disabled=!stores.length;
$("address-input").disabled=!stores.length;
$("search-address").disabled=!stores.length;
renderStores();
if(stores.length){selectStore(0);geocodeStores()}

