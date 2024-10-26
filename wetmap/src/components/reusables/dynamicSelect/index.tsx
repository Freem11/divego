import Icon from "../../../icons/Icon";
import style from './style.module.scss';

export default function DynamicSelect(props){
    return(
    <div className={`${style.dynamicSelect} s-rounded bg-gray columns bg-light p-2 my-2 rounded-4`}>
        <Icon width="24" fill="darkgray" name="close"/>
        <input></input>
        <div className='text-primary'>Search</div>
    </div>);
}