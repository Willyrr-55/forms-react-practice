import { useForm } from "react-hook-form";
import { ageValidator } from "../validators/formValidators";

const RegisterForm = () => {
    const {register, formState:{errors} , watch, handleSubmit} = useForm(
        {
            defaultValues:{
                name:'Willian Rosa',
                address:'Chalatenango'
            }
        }
    );

    const onSubmit =(data)=>{
        console.log(data)
    }

    const phoneNumberEnable = watch('phoneNumberStatus');

    return (
        <div>
            <h2>Registro</h2>
            <h3>Nombre: {watch('name')}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label >Nombre</label>
                    <input type="text" {...register('name',
                        {
                            required:true,
                            maxLength:30
                        } )} />
                        {errors.name?.type === 'required' && <p>El campo es requerido</p>}
                        {errors.name?.type === 'maxLength' && <p>El campo solo debe tener menos de 30 caracteres</p>}
                </div>
                <div>
                    <label >Correo Electrónico</label>
                    <input type="text" {...register('email', {
                        pattern: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
                    })} />
                    {errors.email?.type === 'pattern' &&  <p>El formato del email es incorrecto</p>}
                </div>
                <div>
                    <label >Dirección</label>
                    <input type="text" {...register('address')}/>
                </div>
                <div>
                    <label >Edad</label>
                    <input type="number" {...register('age', {
                        validate:ageValidator
                    })}/>
                    {errors.age && <p>Esta edad no esta permitida</p>}
                </div>
                <div>
                    <label >País</label>
                    <select {...register('country')}>
                        <option value="Salvadorian">El Salvador</option>
                        <option value="EEUU">Estados Unidos</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Guatemala">Guatemala</option>
                    </select>
                </div>
                <div>
                    <label >¿Incluir numero de telefono?</label>
                    <input type="checkbox" {...register('phoneNumberStatus')} />
                </div>
                {phoneNumberEnable && 
                    <div>
                        <label >Numero de telefono</label>
                        <input type="number" {...register('phoneNumber')} />
                    </div>
                }
                
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    )
}   

export default RegisterForm;