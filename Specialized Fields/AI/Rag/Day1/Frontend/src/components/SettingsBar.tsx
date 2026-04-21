import type {Model} from '../types';

interface SettingsBarProps {
  temperature: number;
  setTemperature: (value: number) => void;
  model: string;
  setModel: (value: string) => void;
  tempLabels: string[];
  models: Model[];
}

export default function SettingsBar({
  temperature,
  setTemperature,
  model,
  setModel,
  tempLabels,
  models
}: SettingsBarProps) {
  const tempLabel =
    tempLabels[Math.round((temperature / 100) * (tempLabels.length - 1))];

  return (
    <div className="settings-bar">
      <label>Creativity:</label>
      <input
        type="range"
        min="0"
        max="100"
        value={temperature}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTemperature(Number(e.target.value))
        }
      />
      <span className="temp-label">{tempLabel}</span>

      <label style={{marginLeft: 'auto'}}>Model:</label>
      <select
        className="model-select"
        value={model}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setModel(e.target.value)
        }
      >
        {models.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
