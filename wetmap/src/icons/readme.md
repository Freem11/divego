# How to add svg to the app
Put optimized svg file into `svg` directory and run `node _build-svg.js ` in current folder. The script will parse `svg` directory and create two files:
 - index.html - simple html file for preview. It's a convenient way to check icons added to the app
 - _config.json - basically key value storage (svg name: svg metadata). This file is being used in `Icon.tsx` to generate svg.
 

# How to create/modify/optimize svg in Inkscape

https://inkscape.org/ - Inkscape is a vector graphics editor.

## Remome unnecessary points
Manually - just select point and hit delete - the app will automatically adjust other points to keep the shape
Auto - Path -> simplify. (Edit -> preferences -> Behaviour to adjust simplification options)

## save
save -> optimized svg(for viewbox 512, 2 significant digits is fine)

## To merge paths
select you want to merge then Path -> Union

## To scale the path
Manually - use "Select tool" and drag. Use Ctrl - to keep proportions
Auto - Path -> Path Effects -> Offset - set the offset value

## To change the viewBox
File -> Document props