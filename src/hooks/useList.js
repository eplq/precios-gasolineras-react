import { useState } from "react";

export default function useList() {
    const [list, setListValue] = useState([]);

    const add = newItem => setListValue(list.push(newItem));
    const empty = () => setList([]);
    const getLength = () => list.length;
    const getList = () => list;
    const setList = newList => setListValue(newList);

    return { list, getList, getLength, add, empty, setList }
}
