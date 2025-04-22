import { Camera } from 'lucide-react';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { profileImageState } from '../../store/atoms';

interface ProfileImageUploaderProps {
    className?: string;
}

export const ProfileImageUploader = ({ className }: ProfileImageUploaderProps) => {
    const [profileImage, setProfileImage] = useRecoilState(profileImageState);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={className}>
            <div className="relative inline-block">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-gray-900 rounded-full text-white hover:bg-gray-800"
                >
                    <Camera className="w-4 h-4" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>
        </div>
    );
}; 