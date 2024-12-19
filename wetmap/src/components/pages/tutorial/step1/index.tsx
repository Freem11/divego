import React, { useContext } from 'react';
import Icon from '../../../../icons/Icon';
import TextInput from '../../../reusables/textInput';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../../reusables/button';
import { SliderContext } from '../../../reusables/slider/context';


export default function TutorialStep1() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { slideForward } = useContext(SliderContext);
  const onSubmit = (data: Form) => {
    slideForward();
    console.log(data);
  };

  return (

    <div>
      <div>
        <h1>Tutorial Step 1</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloremque ipsa debitis reprehenderit repudiandae fugiat.</p>

        <form className="flex-column-between mx-6 mb-6" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            error={errors.username}
            iconLeft={<Icon name="person" />}
            placeholder="Enter your username"
            {...register('username', FormRules.username)}
          />

          <div className="mb-4"></div>

          <Button
            disabled={isSubmitting}
            className="btn-lg bg-primary"
            type="submit"
            iconRight={<Icon name="chevron-right" />}
          >
            Page Up
          </Button>
        </form>
      </div>
    </div>


  );
};
