import style from './button.module.css';

export default function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'button' | 'submit';
}) {
  return (
    <button className={style.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
