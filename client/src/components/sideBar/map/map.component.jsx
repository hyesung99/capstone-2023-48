import './map.style.scss';
import '../mainContent.style.scss'
import { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from './config'; // 상수 변수 가져오기
import SearchResult from './searchResult.component';

const Map = (props) =>{
  const {setActiveComponent, zIndex} = props;
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const mapOptions = {
    disableDefaultUI: true, // 기본 제어 UI 숨김
    zoomControl: true, // 줌 컨트롤 표시
  };
 
  const searchBoxRef = useRef(null); 
  const [result, setresult] = useState();
  const [center, setCenter] = useState({
    lat: 37.609980,
    lng: 127.075017
  })

  const  handlePlacesChange = () => {
    console.log(searchBoxRef.current.getPlaces());
    if(searchBoxRef.current && searchBoxRef.current.getPlaces()){
      const places = searchBoxRef.current.getPlaces();
      const place = places[0];
      if(place){
        setresult(place);
        setCenter(place.geometry.location)
      }
    }
  }

  const onKeyDown = (e) => {
    if(e.key='Enter'){
      console.log('enter');
    }
  }
  
  return(
    <div className='main-content-wrapper' style={{zIndex}}>
      
      <LoadScript
        googleMapsApiKey= {GOOGLE_MAPS_API_KEY}
        libraries={GOOGLE_MAPS_LIBRARIES}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={mapOptions}
        >
          <StandaloneSearchBox
            onLoad={(searchBox) => {
              searchBoxRef.current = searchBox;
            }}
            onPlacesChanged={handlePlacesChange}
            >   
            <input
              type="text"
              placeholder="search"
              onKeyDown={onKeyDown}        
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `80%`,
                height: `40px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                marginTop:'2%',
                left: "10%",
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
      {result && <SearchResult result={result} setActiveComponent={setActiveComponent}/>}
    </div>
  )
}

export default Map;