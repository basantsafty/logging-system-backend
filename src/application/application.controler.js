import Application from "./application.model.js";
import express from "express";
import mongoose from "mongoose";

export const createApplication = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.userId);

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
     
    }

    const application = await Application.create({
      name,
      developer: req.userId 
    
    });
    

    res.status(201).json({
      message: "Application created successfully",
      application
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ developer: req.userId }); 
    res.status(200).json({
      message: "Applications retrieved successfully",
      applications
    });
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const { name } = req.params;
    const application = await Application.findOne({ name, developer: req.userId });
    
    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Application retrieved successfully",
      application
    });
  } catch (error) {
    next(error);
  }
};
export const deleteApplication = async (req, res, next) => {
  try {
    const { name } = req.params;
    const application = await Application.findOneAndDelete({ name, developer: req.userId });
    
    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
      application
    });
  } catch (error) {
    next(error);
  }
};
