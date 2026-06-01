import { SlidersHorizontal } from "lucide-react";
import { weightingProfiles } from "../data/weightingProfiles";

interface ProfileSelectorProps {
  selectedProfileId: string;
  onChange: (profileId: string) => void;
}

export function ProfileSelector({ selectedProfileId, onChange }: ProfileSelectorProps) {
  return (
    <label className="profile-selector">
      <SlidersHorizontal aria-hidden="true" size={18} />
      <span>Profile</span>
      <select value={selectedProfileId} onChange={(event) => onChange(event.target.value)}>
        {weightingProfiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.label}
          </option>
        ))}
      </select>
    </label>
  );
}
