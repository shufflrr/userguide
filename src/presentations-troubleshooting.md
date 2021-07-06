# Troubleshooting

## What is going on when presentations are processing? 
When a slide or other material is processing, the following activities are in progress: 
1. First, Shufflrr makes an image (thumbnail) of each slide, in several sizes. 
	- Thumbnails are used throughout the application, such as in search and the slide tray, to allow multiple slides to be seen at the same time. 
	- Thumbnails allow slides to be selected, dragged, and rearranged while giving a clear view of what is on the slide.  
2. Second, Shufflrr processes the slide content. 
	- Processing for search 
		- Text is pulled from each page of materials, including speaker notes and including all supported file types, and stored for searching.
		- Tags and other data about the slide are also stored for searching.
		- Storing text and attributes allows a fast search to find any text on any slide. 
	- Processing for editing
		- Every piece of every slide is processed for editing. The slide is the stage and each piece of information is an actor.  
			- Fonts
			- Images
			- Shapes
			- Backgrounds
			- Colors
		- This allows the user to edit on each of these types of objects and attributes.
		
## What to expect
File processing takes a few minutes when a file is added or saved. Here's how to track that: 
* You will see arrows going in a circle at the top right of the screen with a little number showing the number of processes currently happening.
    
![Uploading queue icon](img/presentations-upload-queueicon.png)

* Click that icon to see the status of your files. 
* Each process described above will show on separate lines. 

![Uploading queue tray](img/presentations-upload-queuetray.png)    
    
* When the first process is finished, you will be able to see the deck in the left navigation and click on it. 
* You will be able to move or delete slides at this point, but not edit slides until the second process has finished. 
* When slides are ready, a blue "Edit" button will appear. Click it to modify the slides.  

![Multi-step process](img/presentations-upload-multistep.png)

## Troubleshooting

1. [Font issues](#fontIssues)
2. [Complex graphics](#complexGraphics)
	- [Grouped animations](#groupedAnimations)
	- [Other grouped objects](#groupedObjects)
	- [Smart Art](#smartArt)
	- [Gradients, shadows, and opacity](#gradients)

<a name="fontIssues"></a>
### Font issues
If you are experiencing font issues, first make sure that your admin has enabled your desired font. 

Check the [Admin > Brand Central > Fonts](admin-brand-central.md#fonts) page for more details. Frequently, font issues are caused by failing to do the last step: checking the box to make a font available. 

![Check the box to make the font available](img/admin-brandcentral-fonts-4.png) 

<a name="complexGraphics"></a>
### Complex graphics
Extremely complex graphics, such as grouped animations or grouped Smart Art, may have trouble rendering correctly particularly in the editor. 

For example, a map of the fifty United States as fifty separate objects grouped together with a single gradient and shadow across all of theme (instead of a gradient within each state) is an example of a graphic that did not render properly in Shufflrr.  

<a name="groupedAnimations"></a>
#### Grouped Animations
Grouped animations may fail. 

**Suggestion**: Make a video of the animated objects and embed the video instead of the separate objects. 

<a name="groupedObjects"></a>
#### Grouped Objects
Grouped objects, particularly complex objects, may cause failures. 

**Suggestion**: Use a screenshot to make an image of the grouped objects, or, get them just how you want them and then ungroup them. 

<a name="smartArt"></a>
#### SmartArt
Microsoft SmartArt may cause failures. 

**Suggestion**: Use a screenshot to make an image of the SmartArt, and use the image. 

<a name="gradients"></a>
#### Gradients, shadows, and opacity
Complex gradients, shadows, and lowered opacity may cause failures.
 
**Suggestion**: Use a screenshot to make a flat image, and use that in place of the manipulated images. 


