# Skin cancer detection system using Machine Learning


The solution implemented for early detection of the skin cancer. It allows user to upload photos of their skin moles in order to be checked for skin cancer detection using machine learning algorithms. The outcome would be a proprobability for that mole to become skin cancer.

The accuracy of the system is 84,8%. 

 The application features a page for diplaying real-time processing progress of each photo, a page for history information and of course dark theme!

The technologies used were 
* C# for back-end, 
* React for front-end
* Material UI 
* ML .NET
* MediatR
* RabbitMQ
* SignalR
* CAP library
* RabbitMQ
* SQL
* ImageSharp


Please note that this repo does not contains the source code of the whole system. 

![Flow](Pic/complete-flow.gif)


## System Design 
The systems consists of multiple microservices:

* Web application
* Image  processing service a
* The classification service
* RabbitMQ (external service) - the messaging service 
* imagekit.io (external service) - the storage service

Each microservice manages a single functionality and it can be hosted independently of the others. Communication between components is done through a message broker. The client can access the system with the front-end application which is loaded in the browser. The front-end application is compatible with devices with small screen size.

The system architecture:

![Design](Pic/design.png)

## The machine learning model 

The machine learning model (including training and consuming the model) was implemented using [ML. NET](https://dotnet.microsoft.com/en-us/apps/machinelearning-ai/ml-dotnet) library. 

The dataset used for training & validation is [HAM10000, a large collection of multi-source dermatoscopic images of common pigmented skin lesions](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T). 

The number of photos used is 2940 divided into two classes: malignant and benign with about the same number of photos in each class.

||Photos count|
|--|--|
|``malignant``| 1433|
|``benign``| 1507|
|total|2940

The proportion between training and validation sets was 80:20.