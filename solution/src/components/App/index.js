
import style from './style.module.css';
import LocationsList from '../LocationsList';

const App = props => {

    return (
        <div className={style.App}>
            <LocationsList />
        </div>
    );

};

export default App;
