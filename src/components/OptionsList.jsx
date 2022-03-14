
export default function OptionsList(props) {
    return props.list.map((element, index) => <option key={index} value={element[props.idField]}>{element[props.valueField]}</option>)
}