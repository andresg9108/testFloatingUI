import './Test1.sass';

import { 
	useEffect, 
	useRef  
} from 'react';

import { 
	computePosition, 
	flip, 
	shift, 
	offset, 
	arrow 
} from '@floating-ui/dom';

const Test1 = () => {

	const myButton = useRef(null);
	const myTooltip = useRef(null);

	const updatePosition = () => {
		computePosition(myButton.current, myTooltip.current, {
			strategy: 'absolute', // 'absolute' o 'fixed', 'absolute' por defecto. Debe coincidir con la propiedad CSS del Tooltip. Se recomienda 'fixed' cuando el botón también está 'fixed'.
			placement: 'right-start', // Colocación: left, right, top, bottom, right-start, bottom-end
			middleware: [ // Un middleware es un fragmento de código que se ejecuta entre la llamada
			// Nota: El orden importa porque el siguiente middleware toma la posición del anterior.
				offset(6), 
				// Permite separar el Tooltip del botón. 
				flip(), 
				// Cambia la posición del Tooltip si no hay espacio para este en la posición actual.
				shift({padding: 5}), 
				// Evita que si hay mucho texto este no se pierda en la pantalla cuando se modifica la posición del Tooltip. 
				// Esto ocurre a veces cuando el Tooltip está centrado.
				// El «padding» nos para que no se vea pegado al borde de la pantalla si lo está.
				arrow({element: myTooltip.current.querySelector('div')}),
				] 
		}).then(({x, y, placement, middlewareData}) => {
		  // Cambiando la posición del Tooltip teniendo en cuenta la posición actual y modificando los estilos CSS.
		  Object.assign(myTooltip.current.style, {
		    left: `${x}px`,
		    top: `${y}px`,
		  });

		  // Modificando la posición de la flecha.
		  const {x: arrowX, y: arrowY} = middlewareData.arrow;
		  const staticSide = {
		    top: 'bottom',
		    right: 'left',
		    bottom: 'top',
		    left: 'right',
		  }[placement.split('-')[0]];
		  Object.assign(myTooltip.current.querySelector('div').style, {
		    left: arrowX != null ? `${arrowX}px` : '',
		    top: arrowY != null ? `${arrowY}px` : '',
		    right: '',
		    bottom: '',
		    [staticSide]: '-4px',
		  });
		});
	}

	useEffect(() => {
		[
		  ['mouseenter', () => {
		  	myTooltip.current.style.display = 'block';
		  	updatePosition();
		  }],
		  ['mouseleave', () => {
		  	myTooltip.current.style.display = '';
		  }],
		  ['focus', () => {
		  	myTooltip.current.style.display = 'block';
		  	updatePosition();
		  }],
		  ['blur', () => {
		  	myTooltip.current.style.display = '';
		  }],
		].forEach(([event, listener]) => {
		  myButton.current.addEventListener(event, listener);
		});
	}, []);

	return(
		<>
			<button 
				ref={myButton} 
				aria-describedby="tooltip" 
				className="button-Test1" 
			>
				Mi Botón
			</button>
			<div 
				ref={myTooltip} 
				role="tooltip" 
				className="tooltip-Test1" 
			>
				Mi información.
				<div
					className="arrow-Test1"
				></div>
			</div>
		</>
	);
}

export default Test1;