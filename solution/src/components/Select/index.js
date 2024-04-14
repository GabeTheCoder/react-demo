
import { useState } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';
import { expandArrow } from '../../assets/icons';

function Select(props) {

    const [active, setActive] = useState(false);

    const className = conditional('Select', style, { active });

    const option = data => (
        <div className={style.option} onClick={() => props.onSelect(data)}>
            {data}
        </div>
    );

    return (
        <div className={className} onClick={() => setActive(active => !active)} onBlur={() => setActive(false)} tabIndex={0}>
            <div className={style.select}>
                <div className={style.value}>{props.value}</div>
                <div className={style.icon} style={{ backgroundImage: expandArrow }} />
            </div>
            <div className={style.options}>
                {props.options.map(option)}
            </div>
        </div>
    );

}

export default Select;
