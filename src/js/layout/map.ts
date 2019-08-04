type Lang = "ru_RU" | "en_US" | "en_RU" | "ru_UA" | "uk_UA" | "tr_TR";
type MapType = "yandex" | "google";

interface MapProps {
  apikey?: string;
  lang: Lang;
  container: HTMLDivElement;
  type: MapType;
  zoom: number;
  center: [number, number];
}

export function map({ apikey, lang, container, type, zoom, center }: MapProps) {
  function createYandexMap() {
    let url = "https://api-maps.yandex.ru/2.1/?";

    if (apikey) {
      url += "&apikey=" + apikey;
    }

    url += "&lang=" + lang;

    function init() {
      // @ts-ignore
      const myMap = new ymaps.Map(
        container,
        {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: center,
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: zoom,

          controls: [],
        },
        { suppressMapOpenBlock: true },
      );

      window.addEventListener("resize", () => {
        myMap.container.fitToViewport();
      });
    }

    const script = document.createElement("script");
    script.src = url;
    script.addEventListener("load", () => {
      // @ts-ignore
      ymaps.ready(init);
    });

    document.head.appendChild(script);
  }

  function createGoogleMap() {
    let url = "https://maps.googleapis.com/maps/api/js?";

    if (apikey) {
      url += "&key=" + apikey;
    }

    function init() {
      // @ts-ignore
      var map = new google.maps.Map(container, {
        zoom: zoom,
        center: { lat: center[0], lng: center[1] },
      });
      // @ts-ignore
      var marker = new google.maps.Marker({ position: uluru, map: map });
    }

    const script = document.createElement("script");
    script.src = url;
    script.addEventListener("load", () => {
      init();
    });

    document.head.appendChild(script);
  }

  switch (type) {
    case "google":
      createGoogleMap();
      break;
    case "yandex":
      createYandexMap();
      break;
  }
}
