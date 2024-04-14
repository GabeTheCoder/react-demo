
import { useState } from 'react';
import style from './style.module.css';
import LocationAdd from '../LocationAdd';
import { location } from '../../assets/icons';

const LocationsList = props => {

    const [locations, setLocations] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const item = data => (
        <div className={style.item}>
            <div className={style.itemName}>{data.name}</div>
            <div className={style.itemInfo}>
                <div className={style.infoIcon} style={{ backgroundImage: location }} />
                <div className={style.infoText}>{data.location}</div>
            </div>
        </div>
    );
    
    return (
        <div className={style.LocationsList}>
            <div className={style.card}>
                <div className={style.header}>
                    <div className={style.title}>Locations</div>
                    <button className={style.buttonPrimary} onClick={() => setShowAdd(true)}>Add Location</button>
                </div>
                <div className={style.list}>
                    {locations.map(item)}
                </div>
            </div>
            <LocationAdd 
                show={showAdd} 
                onDismiss={() => setShowAdd(false)}
                onSave={location => setLocations(existing => [location, ...existing])} />
        </div>
    );

};

export default LocationsList;
