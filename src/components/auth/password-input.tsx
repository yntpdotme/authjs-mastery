import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {ControllerRenderProps, FieldValues} from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

interface PasswordInputProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  placeholder?: string;
  disabled?: boolean;
}

const PasswordInput = <TFieldValues extends FieldValues>({
  field,
  placeholder = '******',
  disabled = false,
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-end rounded-md border">
      <Input
        {...field}
        placeholder={showPassword ? 'password' : placeholder}
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        className="border-0 hover:outline-none"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="mx-2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? (
          <AiOutlineEyeInvisible className="size-5" />
        ) : (
          <AiOutlineEye className="size-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
