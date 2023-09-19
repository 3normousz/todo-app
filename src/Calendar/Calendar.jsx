import { useState } from 'react'
import Cell from './Cell'
import '../index.css'

const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

function Calendar() {
    return (
        <>
            <div className='w-[400px] border'>
                <div className='grid grid-cols-7'>
                    <Cell>{"<<"}</Cell>
                    <Cell>{"<"}</Cell>
                    <Cell className='col-span-3 font-bold'>August 2022</Cell>
                    <Cell>{">"}</Cell>
                    <Cell>{">>"}</Cell>

                    {daysOfWeek.map((day) => (
                        <Cell className="text-sm font-bold">
                            {day}
                        </Cell>))}

                    <Cell />
                    <Cell>1</Cell>
                    <Cell>2</Cell>
                    <Cell>3</Cell>
                    <Cell>4</Cell>
                    <Cell>5</Cell>
                    <Cell>6</Cell>
                    <Cell>7</Cell>
                    <Cell>8</Cell>
                    <Cell>9</Cell>
                    <Cell>10</Cell>
                    <Cell>11</Cell>
                    <Cell>12</Cell>
                    <Cell>13</Cell>
                    <Cell>14</Cell>
                    <Cell>15</Cell>
                    <Cell>16</Cell>
                    <Cell>17</Cell>
                    <Cell>18</Cell>
                    <Cell>19</Cell>
                    <Cell>20</Cell>
                    <Cell>21</Cell>
                    <Cell>22</Cell>
                    <Cell>23</Cell>
                    <Cell>24</Cell>
                    <Cell>25</Cell>
                    <Cell>26</Cell>
                    <Cell>27</Cell>
                    <Cell>28</Cell>
                    <Cell>29</Cell>
                    <Cell>30</Cell>
                    <Cell>31</Cell>
                </div>
            </div>
        </>
    )
}

export default Calendar
