      const button = document.querySelector('#button');
      const tooltip = document.querySelector('#tooltip');

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y+200,
    right: x,
    bottom: y,
    left: x+100,
  });
}



const virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect(),
};

      let popperInstance = null;

      function create() {
        popperInstance = Popper.createPopper(virtualElement, tooltip, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        });
      }

      function destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }

      function show() {
        tooltip.setAttribute('data-show', '');
        create();
      }

      function hide() {
        tooltip.removeAttribute('data-show');
        destroy();
      }

      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      showEvents.forEach(event => {
        button.addEventListener(event, show);
      });

      hideEvents.forEach(event => {
        button.addEventListener(event, hide);
      });

      document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
  virtualElement.getBoundingClientRect = generateGetBoundingClientRect(x, y);
  popperInstance.update();
});