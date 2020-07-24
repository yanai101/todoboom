import React, {useState} from 'react'
import './activityFilter.scss'
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { CATEGORIES } from '../../../utils/enums';

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
const Range = Slider.Range;

export default function ActivityFilter({addFilter}) {
    const [openFilter , setOpenFilter] = useState(false);
    const [duration , setDuration] = useState([0,65]);
    const [age , setAge] = useState([0,18]);

    const onDurationSliderChange = (value) =>{
        setDuration(value);
        addFilter('time',value)
    }

    const onAgeChange = (value) =>{
        setAge(value);
        addFilter('age',value)
    }

    return (
        <div className={`filterContainer ${openFilter ? 'open' : ''}`}>
            <div className="heandle" onClick={()=>setOpenFilter(!openFilter)}>
                <span>
                    <FaChevronLeft className={`faArrow ${openFilter ? 'open' : ''}`}/>
                </span>
            </div>

            <main className="filters">
                <h3>FILTER ACTIVITIES</h3>
                <h6>Categories</h6>
                {Object.keys(CATEGORIES).map(key =>{
                    if(key !== 'none'){
                        const cat = CATEGORIES[key];
                        return <label className="filterCat" key={key} style={{backgroundColor: `${cat.color}`}}>
                                    {cat.text}
                                    <input type="checkbox" value={key} onChange={()=>addFilter('category', key)}/>
                                    <FaCheck className="checkboxV" />
                                </label>
                    }
                }
                )}

                <h6>Activity duration (estimated)</h6>
                <div className="rangeInput" aftermin="0" aftermax="60+">
                    <div className="rangeStyle" aftermin={`${duration[0]} - `} aftermax={duration[1] > 60 ? '60+' : duration[1]}> 
                        <Range className="duration" min={0} max={61} defaultValue={[0,61]} onChange={onDurationSliderChange }/>
                    </div>
                </div>
                <br/>
                <h6>Suitable for ages</h6>
                <div className="ageRange" aftermin="0" aftermax="18">
                    <div className="rangeStyle" aftermin={`${age[0]} - `} aftermax={age[1]}> 
                        <Range className="duration" min={0} max={18} defaultValue={[0,18]} onChange={onAgeChange }/>
                    </div>
                </div>

            </main>
        </div>
    )
}
