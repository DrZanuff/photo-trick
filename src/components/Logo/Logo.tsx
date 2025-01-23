import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import './Logo-styles.css';
import { COLORS } from '@/theme';

export function Logo() {
  return (
    <div className={'Logo-container'}>
      <h1>
        <span style={{ color: COLORS.INFO_MAIN }}>PHOTO</span>-
        <span style={{ color: COLORS.WARNING_MAIN }}>TRICK</span>
      </h1>
      <AutoFixHighIcon color="primary" />
    </div>
  );
}
