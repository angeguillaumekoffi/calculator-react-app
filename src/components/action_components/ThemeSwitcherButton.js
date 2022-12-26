
function ThemeSwitcherButton(props) {

  return (
    <div className="theme-switch-container">
      <div className="theme-switch-buttons">
        <input type="radio" name='theme' onClick={null} defaultChecked/>
        <input type="radio" name='theme' onClick={null} />
        <input type="radio" name='theme' onClick={null} />
      </div>
    </div>
  );
};

export default ThemeSwitcherButton;