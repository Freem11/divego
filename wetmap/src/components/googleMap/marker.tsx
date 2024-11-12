import { useEffect, useRef } from 'react';

interface AdvancedMarkerProps {
  // map:      google.maps.Map | null
  position:   google.maps.LatLng | google.maps.LatLngLiteral
  title?:     string
  icon:       string
  draggable?: boolean
  onClick?:   () => void
  onDragEnd?: (position: google.maps.LatLngLiteral) => void
  onLoad?:    (marker: google.maps.marker.AdvancedMarkerElement) => void
}

const Marker: React.FC<AdvancedMarkerProps> = ({ position, title, icon, onClick, draggable, onDragEnd, onLoad }) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      // Create a new AdvancedMarkerElement
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        // map:      map,
        position: position,
        title:    title,
        content:  document.createElement('div'),
      });


      // Call onLoad with the marker reference if onLoad is provided
      if (onLoad && markerRef.current) {
        onLoad(markerRef.current);
      }

      // Add the click event listener if onClick is provided
      if (onClick) {
        markerRef.current.addEventListener('click', onClick);
      }

      // Enable dragging by attaching drag events if draggable is true
      if (draggable) {
        enableDragging();
      }
    }


    // Clean up marker when component unmounts
    return () => {
      if (markerRef.current) {
        if (onClick) {
          markerRef.current.removeEventListener('click', onClick);
        }
        if (draggable) {
          disableDragging();
        }
        markerRef.current.map = null;
        markerRef.current = null;
      }
    };
  }, [position, title, onClick, draggable, onLoad]);

  // Set the icon content once the marker is created
  useEffect(() => {
    if (markerRef.current && icon) {
      const content = document.createElement('div');
      content.innerHTML = `<img src="${icon}" alt="${title || 'Marker'}" style="width: 40px; height: 40px;" />`;
      markerRef.current.content = content;
    }
  }, [icon, title]);

  // Update position if it changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.position = position;
    }
  }, [position]);

  // Update dragging capability based on draggable prop
  useEffect(() => {
    if (markerRef.current) {
      if (draggable) {
        enableDragging();
      } else {
        disableDragging();
      }
    }
  }, [draggable]);

  // Enable dragging by attaching relevant drag events
  const enableDragging = () => {
    if (markerRef.current) {
      markerRef.current.draggable = true;

      markerRef.current.addEventListener('dragend', () => {
        if (onDragEnd && markerRef.current) {
          const newPosition = markerRef.current.position as google.maps.LatLng;
          onDragEnd({ lat: newPosition.lat(), lng: newPosition.lng() });
        }
      });
    }
  };

  // Disable dragging by removing drag events
  const disableDragging = () => {
    if (markerRef.current) {
      markerRef.current.draggable = false;
      markerRef.current.removeEventListener('dragend', () => {});
    }
  };

  return null; // This component does not render anything in the DOM
};

export default Marker;
