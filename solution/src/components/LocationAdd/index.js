
import { useState, useEffect } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';
import { useDebouncedRequest } from '../../utils/time';
import { isNameValid, getLocations } from '../../api';
import Select from '../Select';

const LocationAdd = props => {

    const [locations, setLocations] = useState([]);

    const [name, setName] = useState('');
    const [location, setLocation] = useState(null);
    const [states, setStates] = useState({});

    const updateState = (field, value) => {
        setStates(existing => ({ ...existing, [field]: value }));
    };

    const reset = () => {
        setName('');
        setLocation(null);
        setStates({});
    };

    const fetch = async () => {
        const results = await getLocations();
        setLocations(results);
    };

    useEffect(() => { fetch() }, []);
    useEffect(() => { props.show && reset() }, [props.show]);

    useDebouncedRequest(async () => await isNameValid(name), valid => {
        updateState('name', !name ? 'empty' : (valid ? 'valid' : 'invalid'));
    }, name, 1000);
    
    const updateName = e => {
        setName(e.target.value);
        updateState('name', e.target.value ? 'pending' : 'empty');
    };

    const updateLocation = data => {
        setLocation(data);
        updateState('location', data ? 'valid' : 'empty');
    };

    const issue = field => {
        const issueMessages = {
            name: {
                valid: 'Nice, you can use this name',
                invalid: 'This name has already been taken',
                pending: 'Checking availability...',
                empty: 'You must enter a name first'
            },
            location: {
                empty: 'You must select a location first'
            }
        };

        const message = issueMessages[field][states[field]];
        if (!message) return null;
        return <div className={style.issue}>{message}</div>;
    };

    const save = () => {
        if (!name) updateState('name', 'empty');
        if (!location) updateState('location', 'empty');

        const required = ['name', 'location'];
        const valid = required.every(prop => states[prop] === 'valid');
        if (!valid) return;

        props.onDismiss();
        props.onSave({ name, location });
    };

    const className = conditional('AddLocation', style, { visible: props.show });

    return (
        <div className={className}>
            <div className={style.fader} />
            <div className={style.modal}>
                <div className={style.title}>Add Location</div>
                <div className={style.field}>
                    <label className={style.label}>Name</label>
                    <div className={style.inputContainer}>
                        <input className={style.input} value={name} onChange={updateName}></input>
                    </div>
                    {issue('name')}
                </div>
                <div className={style.field}>
                    <label className={style.label}>Location</label>
                    <div className={style.inputContainer}>
                        <Select value={location || 'Select a location'} options={locations} onSelect={updateLocation} />
                    </div>
                    {issue('location')}
                </div>
                <div className={style.actions}>
                    <button className={style.buttonSecondary} onClick={() => props.onDismiss()}>Cancel</button>
                    <button className={style.buttonPrimary} onClick={save}>Add Location</button>
                </div>
            </div>
        </div>
    );
    
};

export default LocationAdd;
