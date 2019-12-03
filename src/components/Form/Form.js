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
        const uploadObject = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role
        }
        alert(JSON.stringify(uploadObject));
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
                                <span className="form_inputs__label-text">First name</span>
                                <input
                                    className={`${values.firstNameError ? 'form_inputs__error' : '' } `} 
                                    type="text" 
                                    name="firstName" 
                                    value={values.firstName} 
                                    placeholder="First name"
                                    onChange={handleInputChange}/>
                                <span className="form_inputs__label-error">{values.firstNameError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span className="form_inputs__label-text">Last name</span>
                                <input 
                                    className={`${values.lastNameError ? 'form_inputs__error' : '' } `}
                                    type="text" 
                                    name="lastName" 
                                    value={values.lastName} 
                                    placeholder="Last name"
                                    onChange={handleInputChange} />
                                    <span className="form_inputs__label-error">{values.lastNameError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span className="form_inputs__label-text">Email</span>
                                <input 
                                    className={`${values.emailError ? 'form_inputs__error' : '' } `}
                                    type="email" 
                                    name="email" 
                                    value={values.email} 
                                    placeholder="email"
                                    onChange={handleInputChange} />
                                <span className="form_inputs__label-error">{values.emailError}</span>
                            </label>
                            <label className="form_inputs__label">
                                <span className="form_inputs__label-text">Role</span>
                                <select className="input-select" name="role" onChange={handleInputChange}>
                                    {selectRoles}
                                </select>
                            </label>
                        </div>

                        <label>
                            <input className="form-button" type="submit" value="Save" disabled={isValid}/>
                        </label>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}