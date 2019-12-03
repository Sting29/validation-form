import React, {useState, useEffect} from 'react';

import './Form.css';

export const Form = () => {

    const roles = [
        {
            id: 'admin',
            role: 'IT Administration'
        },
        {
            id: 'devops',
            role: 'DevOps'
        },
        {
            id: 'frontend',
            role: 'FrontEnd Developer'
        },
        {
            id: 'backend',
            role: 'BackEnd Developer'
        },
        {
            id: 'qa',
            role: 'QA'
        },
        {
            id: 'manager',
            role: 'Manager'
        }];
		
 
    const [values, setValues] = useState({
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
        role: roles[0].role      
    });

    const [isValid, setIsValid] = useState(true);

    const handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        const type = event.target.type

        console.log(type)
        console.log(name);
        console.log(value);

        if (type === 'text') {
            if(value.length === 0) {
                setValues({
                    ...values,
                    [name]: value,
                    [name+'Error']: 'This field is required'
                })                
            } else {
                setValues({
                    ...values,
                    [name]: value,
                    [name+'Error']: ''
                })    
            }
        } else if (type === 'email') {
            if (/\S+@\S+\.\S+/.test(value)) {
                setValues({
                    ...values,
                    [name]: value,
                    [name+'Error']: ''
                })    
            } else {
                setValues({
                    ...values,
                    [name]: value,
                    [name+'Error']: 'You have entered an invalid email address!'
                })   
            }
        } else if (type === 'select-one') {
            setValues({
                ...values,
                [name]: value
            })   
        }
        
    }

    const handleSubmit = event => {
        event.preventDefault();
        alert(JSON.stringify(values));
    }

    useEffect(() => {
        const isFormValid = () => {
            if (!values.firstNameError && !values.lastNameError && !values.emailError 
                && values.firstName.length > 0 && values.lastName.length > 0 && values.email.length > 0) {
                    setIsValid(false)
            } else {
                setIsValid(true)
            }
        }
        isFormValid();
    }, [values]);

    

    const selectRoles = roles.map(item => {
        return (
            <option key={item.id} value={item.role}>{item.role}</option>
        )
    })

    return(
        
        <div className="form-page">
            <h1 className="page-title">Manager Profile</h1>

            <form className="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="visually-hidden">Set Manager Profile</legend>
                    <div className="form_inputs">
                        <div className="form_inputs__wrap">
                            <label className="form_inputs__label">
                                <span>First name</span>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={values.firstName} 
                                    placeholder="First name"
                                    onChange={handleInputChange}/>
                                <span>{values.firstNameError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span>Last name</span>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={values.lastName} 
                                    placeholder="Last name"
                                    onChange={handleInputChange} />
                                    <span>{values.lastNameError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span>Email</span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={values.email} 
                                    placeholder="email"
                                    onChange={handleInputChange} />
                                <span>{values.emailError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span>Role</span>
                                <select name="role" onChange={handleInputChange}>
                                    {selectRoles}
                                </select>
                            </label>
                        </div>

                        <label>
                            <input type="submit" value="Save" disabled={isValid}/>
                        </label>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}