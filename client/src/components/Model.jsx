import React from 'react';
import DatePickerComponent from './Form/DatePicker';

const Model = () => {

    const mode = 'Create'

    const handleChange = () => {

    }

    return (

        <div className='overlay'>
            <div className='model'>
                <div className='form-title-container'>
                    <h3>Let's {mode} a Task</h3>
                    <button> X </button>
                </div>

                <form>
                    <input
                        required
                        maxLength={100}
                        placeholder='Task Name'
                        name='title'
                        value={""}
                        onChange={handleChange}
                    />

                    <br />
                    <label for='range'> Select Your Current Progress </label>

                    <input
                        id='range'
                        required
                        type='range'
                        min='0'
                        max='100'
                        value={""}
                        onChange={handleChange} 
                    />
                    <br />
                    <DatePickerComponent />

                    

                    <input  type='submit'/>
                </form>

            </div>



        </div>
    );
};

export default Model;