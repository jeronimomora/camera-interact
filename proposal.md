# CS284A Project Proposal: Camera Interact
Jeronimo Mora and Sam Lau

## Summary
Our project is an interactive web-based tool to help students learn about
cameras. By interacting with a scene in their browser, students will develop an
intuitive understanding of: focal length vs. field of view, exposure vs.
shutter speed, lenses, and f-stop vs. the circle of confusion. We hope that the
project will provide a useful learning tool for future CS184/284A students.

## Problem Description

Cameras involve a lot of moving parts, literally and figuratively. When
learning about cameras, we find that students have difficulty keeping track of
all the different terms (eg. f-stop vs. focal length vs. shutter speed). This
is made more difficult in the context of CS184/284A because the various
concepts are taught one by one over the course of three lectures.

We hope to create an interactive demo to allow students to play with all the
important camera concepts at once. This will help students understand each
camera parameter on its own, as well as how they relate to each other (eg.
f-stop vs. shutter speed for exposure).

In addition, we will record demos that can supplement the slides for future
CS184/284A lectures.

## Goals and Deliverables
The main goal of this project is to create an interactive scene or set of
scenes that aims to teach basic principles of cameras and photography. From
this set of scenes, demos can be created that will give the user an intuition
about how a certain parameter (such as focal length) has on how an image would
be created. One such demo may include having a scene with lots of detail at
various zoom levels (such as the church scene shown in lecture). As the focal
length changes, the field of view and magnification changes along with it. This
will teach the user about the focal length. An example of an interactive scene
is one which might contain a mountain in the background, trees in the middle,
and a person at the foreground. They may choose camera parameters such as the
focal length, aperture etc and the scene will change in real-time. Once they
have the settings chosen, the user may wish to move the camera to compose the
scene. This can be iterated over until the user is pleased with the result.

Metrics:
Is the interface intuitive?
Can a user understand its use without instructions?
Did the user learn anything?
Are there any bugs that seriously distract from the experience?
Does it lag when the parameters are changed?
Does the image take a long time to render?

## Schedule

### Week 1
Learn WebGL and three.js.
Construct a scene with no camera

### Week 2 (Milestone week)
Start interactive GUI
Add camera
Add ability to take picture with camera
Add focal length + field of view parameter

### Week 3
Add shutter speed + exposure parameter
Add f-stop + plane of focus parameter

### Week 4
Write paper
Create demos, video, poster, and website for project

## Resources

https://threejs.org/
