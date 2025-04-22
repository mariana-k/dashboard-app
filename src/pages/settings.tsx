import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, SettingsFormData } from '../lib/helpers/settings-schema';
import { ProfileImageUploader } from '../components/settings/ProfileImageUploader';
import { FormInput } from '../components/settings/FormInput';
import { FormButton } from '../components/settings/FormButton';
import { SettingsTabs } from '../components/settings/SettingsTabs';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: 'Charlene Reed',
      username: 'Charlene Reed',
      email: 'charlenereed@gmail.com',
      password: '********',
      dateOfBirth: '25 January 1990',
      presentAddress: 'San Jose, California, USA',
      permanentAddress: 'San Jose, California, USA',
      city: 'San Jose',
      postalCode: '45962',
      country: 'USA',
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-white rounded-[20px] min-h-[calc(100vh-6rem)]">
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-8">
        {activeTab === 'edit-profile' && (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
            <ProfileImageUploader className="mb-8" />

            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <FormInput
                label="Your Name"
                name="name"
                register={register}
                error={errors.name?.message}
              />
              <FormInput
                label="User Name"
                name="username"
                register={register}
                error={errors.username?.message}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email?.message}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
              />
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                register={register}
                error={errors.dateOfBirth?.message}
              />
              <FormInput
                label="Present Address"
                name="presentAddress"
                register={register}
                error={errors.presentAddress?.message}
              />
              <FormInput
                label="Permanent Address"
                name="permanentAddress"
                register={register}
                error={errors.permanentAddress?.message}
              />
              <FormInput
                label="City"
                name="city"
                register={register}
                error={errors.city?.message}
              />
              <FormInput
                label="Postal Code"
                name="postalCode"
                register={register}
                error={errors.postalCode?.message}
              />
              <FormInput
                label="Country"
                name="country"
                register={register}
                error={errors.country?.message}
              />
            </div>

            <div className="mt-8 flex justify-end">
              <FormButton type="submit" disabled={isSubmitting}>
                Save
              </FormButton>
            </div>
          </form>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              {/* Notification preferences content */}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <div className="space-y-4">
              {/* Security settings content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;