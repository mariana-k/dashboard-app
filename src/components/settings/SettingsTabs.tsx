import { Camera, Bell, Lock, Palette } from 'lucide-react';
import { cn } from '../../helpers/utils';

type Tab = {
    id: string;
    label: string;
    icon: typeof Bell;
};

const tabs: Tab[] = [
    { id: 'edit-profile', label: 'Edit Profile', icon: Camera },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
];

interface SettingsTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
    return (
        <div className="border-b border-gray-100">
            <div className="flex gap-8 px-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'py-4 text-base font-medium relative',
                            activeTab === tab.id
                                ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}; 