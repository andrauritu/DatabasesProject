CREATE TABLE Greenhouses (
    GreenhouseID NUMBER PRIMARY KEY,
    Name VARCHAR2(50) NOT NULL
);

CREATE TABLE Ecosystems (
    EcosystemID NUMBER PRIMARY KEY,
    Type VARCHAR2(50) NOT NULL,
    Description VARCHAR2(1000) NOT NULL,
    GreenhouseID NUMBER NOT NULL,
    FOREIGN KEY (GreenhouseID) REFERENCES Greenhouses(GreenhouseID)
);

CREATE TABLE Locations (
    LocationID NUMBER PRIMARY KEY,
    Name VARCHAR2(50) NOT NULL,
    Region VARCHAR2(150) NOT NULL,
    Climate VARCHAR2(50) NOT NULL,
    Latitude FLOAT NOT NULL,
    Longitude FLOAT NOT NULL,
    EcosystemID NUMBER NOT NULL,
    FOREIGN KEY (EcosystemID) REFERENCES Ecosystems(EcosystemID)
);

CREATE TABLE WeatherData (
    WeatherDateID NUMBER PRIMARY KEY,
    "Date" DATE NOT NULL,
    Temperature FLOAT NOT NULL,
    Precipitation FLOAT NOT NULL,
    Humidity FLOAT NOT NULL,
    LocationID NUMBER NOT NULL,
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);

CREATE TABLE Terrains (
    TerrainID NUMBER PRIMARY KEY,
    Type VARCHAR2(50) NOT NULL,
    Features VARCHAR2(1000) NOT NULL,
    EcosystemID NUMBER NOT NULL,
    FOREIGN KEY (EcosystemID) REFERENCES Ecosystems(EcosystemID)
);

CREATE TABLE SoilTypes (
    SoilTypeID NUMBER PRIMARY KEY,
    Type VARCHAR2(50) NOT NULL,
    TerrainID NUMBER NOT NULL,
    FOREIGN KEY (TerrainID) REFERENCES Terrains(TerrainID)
);

CREATE TABLE VisitPrices (
    VisitPriceID NUMBER PRIMARY KEY,
    Price FLOAT NOT NULL,
    VisitID NUMBER NOT NULL,
    FOREIGN KEY (VisitID) REFERENCES Visits(VisitID)
);

CREATE TABLE VisitTimes (
    VisitTimeID NUMBER PRIMARY KEY,
    Duration NUMBER NOT NULL,
    VisitID NUMBER NOT NULL,
    FOREIGN KEY (VisitID) REFERENCES Visits(VisitID)
);

CREATE TABLE Plants (
    PlantID NUMBER PRIMARY KEY,
    "DatePlanted" DATE NOT NULL,
    Height FLOAT NOT NULL,
    GreenhouseID NUMBER NOT NULL,
    FOREIGN KEY (GreenhouseID) REFERENCES Greenhouses(GreenhouseID)
);

CREATE TABLE PlantNutrientLevels (
    PlantNutrientLevelID NUMBER PRIMARY KEY,
    Nitrogen FLOAT NOT NULL,
    Phosphorus FLOAT NOT NULL,
    Potassium FLOAT NOT NULL,
    PlantID NUMBER NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

CREATE TABLE Species (
    SpeciesID NUMBER PRIMARY KEY,
    CommonName VARCHAR2(50) NOT NULL,
    ScientificName VARCHAR2(50) NOT NULL,
    PlantID NUMBER NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

CREATE TABLE PlantLifeCycles (
    PlantLifeCycleID NUMBER PRIMARY KEY,
    GerminationDate DATE NOT NULL,
    MaturityDate DATE NOT NULL,
    PlantID NUMBER NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

CREATE TABLE PlantHarvests (
    PlantHarvestID NUMBER PRIMARY KEY,
    DateHarvested DATE NOT NULL,
    SpeciesID NUMBER NOT NULL,
    FOREIGN KEY (SpeciesID) REFERENCES Species(SpeciesID)
);

CREATE TABLE Watering (
    WateringID NUMBER PRIMARY KEY,
    Frequency NUMBER NOT NULL,
    LastWatered DATE NOT NULL,
    PlantID NUMBER NOT NULL,
    WorkerID NUMBER NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID),
    FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
);

CREATE TABLE Pesticides (
    PesticideID NUMBER PRIMARY KEY,
    Type VARCHAR2(50) NOT NULL,
    PlantID NUMBER NOT NULL,
    WorkerID NUMBER NOT NULL,
    "Date" DATE NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID),
    FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
);

CREATE TABLE Photos (
    PhotoID NUMBER PRIMARY KEY,
    DateTaken DATE NOT NULL,
    PlantID NUMBER NOT NULL,
    UserID NUMBER NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Users (
    UserID NUMBER PRIMARY KEY,
    Email VARCHAR2(50) NOT NULL,
    Password VARCHAR2(50) NOT NULL,
    Username VARCHAR2(50) NOT NULL,
    "DateJoined" DATE NOT NULL
);

CREATE TABLE Workers (
    WorkerID NUMBER PRIMARY KEY,
    Name VARCHAR2(50) NOT NULL,
    RoleDescription VARCHAR2(1000) NOT NULL,
    Salary FLOAT NOT NULL,
    UserID NUMBER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE WorkSchedule (
    WorkScheduleID NUMBER PRIMARY KEY,
    "Date" DATE NOT NULL,
    WorkHours NUMBER NOT NULL,
    WorkerID NUMBER NOT NULL,
    FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
);

CREATE TABLE Visits (
    VisitID NUMBER PRIMARY KEY,
    GreenhouseID NUMBER NOT NULL,
    "Date" DATE NOT NULL,
    UserID NUMBER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (GreenhouseID) REFERENCES Greenhouses(GreenhouseID)
);

/*table 1*/
INSERT INTO Ecosystems VALUES (1, 'Tropical Rainforest', 'A tropical rainforest is an ecosystem type that occurs roughly within the latitudes 28 degrees north or south of the equator (in the equatorial zone between the Tropic of Cancer and Tropic of Capricorn). This ecosystem experiences high average temperatures and a significant amount of rainfall. Rainforests can be found in Asia, Australia, Africa, South America, Central America, Mexico and on many of the Pacific, Caribbean, and Indian Ocean islands. Within the World Wildlife Fund''s biome classification, tropical rainforests are a type of tropical moist broadleaf forest that also includes the more extensive seasonal tropical forests.', 1);
INSERT INTO Ecosystems VALUES (2, 'Tropical Savanna', 'A tropical savanna is a grassland biome located in semi-arid to semi-humid climate regions of subtropical and tropical latitudes, with rainfall between 750 and 1,270 mm (30 and 50 in) a year. They are widespread on Africa, and are found in India, the northern parts of South America, Malaysia, and Australia. The largest tropical savanna is the cerrado ecoregion of central Brazil. The term tropical savanna climate is sometimes used in climate classification systems, in which it is divided into savanna or tropical wet and dry climate; with the latter denoting the drier type.', 2);
INSERT INTO Ecosystems VALUES (3, 'Desert', 'A desert is a barren area of landscape where little precipitation occurs and, consequently, living conditions are hostile for plant and animal life. The lack of vegetation exposes the unprotected surface of the ground to the processes of denudation. About one-third of the land surface of the world is arid or semi-arid. This includes much of the polar regions where little precipitation occurs and which are sometimes called polar deserts or ''cold deserts''. Deserts can be classified by the amount of precipitation that falls, by the temperature that prevails, by the causes of desertification or by their geographical location.', 3);
INSERT INTO Ecosystems VALUES (4, 'Temperate Grassland', 'Temperate grasslands, savannahs, and shrublands are terrestrial biomes whose predominant vegetation consists of grass and/or shrubs. The climate is temperate and ranges from semi-arid to semi-humid. The biome includes terrestrial ecoregions classified by the World Wildlife Fund as part of eight biogeographic realms: Nearctic, Neotropic, Afrotropic, Palearctic, Indo-Malay, Australasia, and Oceania. Included are the prairie and plains biomes, which has temperate grasslands, savannas, and shrublands as the dominant vegetation type, and are classified with tropical and subtropical grasslands and shrublands as the tropical and subtropical grasslands, savannas, and shrublands biome.', 4);
INSERT INTO Ecosystems VALUES (5, 'Temperate Forest', 'Temperate forests correspond to forest concentrations formed in the northern and southern hemisphere, or in temperate regions. Main characteristics include: wide leaves, large and tall trees and non seasonal vegetation. Temperate forests can be further distinguished by weather patterns and geographical features that favor the predominance of certain kinds of trees. In temperate coniferous forests, evergreen conifers predominate, while in temperate broadleaf and mixed forests, a more even distribution exists between evergreen and deciduous trees among them oak, maple, birch, and beech.', 5);

/*table 2*/
insert into Locations values (1, 'Amazon Rainforest', 'South America', 'Tropical', -60.9435, -3.4653, 1);    
insert into Locations values (2, 'Cerrado', 'South America', 'Tropical',23.5505, 9.0820, 2);
insert into Locations values (3, 'Sahara Desert', 'Africa', 'Desert', -99.9018,  41.4925, 3);
insert into Locations values (4, 'Prairie', 'North America', 'Temperate', -84.2700, 39.7684, 4);
insert into Locations values (5, 'Taiga', 'North America', 'Boreal',-106.3468, 56.1304, 5);

/*table 3*/
    insert into WeatherData values (1, '2020-01-01', 25.0, 10.0, 75.0, 1);
    insert into WeatherData values (2, '2020-01-02', 28.0, 5.0, 80.0, 2);
    insert into WeatherData values (3, '2020-01-03', 35.0, 2.0, 60.0, 3);
    insert into WeatherData values (4, '2020-01-04', 15.0, 0.5, 50.0, 4);
    insert into WeatherData values (5, '2020-01-05', -5.0, 0.0, 30.0, 5);

/*table 4*/
insert into Terrains values (1, 'Mountain', 'A mountain is a large landform that rises above the surrounding land in a limited area, usually in the form of a peak. A mountain is generally considered to be steeper than a hill. Mountains are formed through tectonic forces or volcanism. These forces can locally raise the surface of the earth. Mountains erode slowly through the action of rivers, weather conditions, and glaciers. A few mountains are isolated summits, but most occur in huge mountain ranges.',1);
insert into Terrains values (2, 'Hill', 'A hill is a landform that extends above the surrounding terrain. It often has a distinct summit, although in areas with scarp/dip topography a hill may refer to a particular section of flat terrain without a massive summit. A hill is a landform that extends above the surrounding terrain. It often has a distinct summit, although in areas with scarp/dip topography a hill may refer to a particular section of flat terrain without a massive summit.',2);
insert into Terrains values (3, 'Plateau', 'In geology and physical geography, a plateau, also called a high plain or a tableland, is an area of a highland consisting of flat terrain, that is raised sharply above the surrounding area on at least one side. Often one or more sides have deep hills. Plateaus can be formed by a number of processes, including upwelling of volcanic magma, extrusion of lava, and erosion by water and glaciers. Plateaus are classified according to their surrounding environment as intermontane, piedmont, or continental.',3);
insert into Terrains values (4, 'Plain', 'In geography, a plain is a flat, sweeping landmass that generally does not change much in elevation. Plains occur as lowlands along the bottoms of valleys or on the doorsteps of mountains, as coastal plains, and as plateaus or uplands.',4);
insert into Terrains values (5, 'Coast', 'A coastline or a seashore is the area where land meets the sea or ocean, or a line that forms the boundary between the land and the ocean or a lake. A precise line that can be called a coastline cannot be determined due to the Coastline paradox.',5);

/*table 5*/
insert into SoilTypes values (1, 'Loam', 1);
insert into SoilTypes values (2, 'Clay', 2);
insert into SoilTypes values (3, 'Silt', 3);
insert into SoilTypes values (4, 'Sand', 4);
insert into SoilTypes values (5, 'Peat', 5);


/*table 6*/
insert into Greenhouses values (1, 'Amazon Greenhouse');
insert into Greenhouses values (2, 'Cerrado Greenhouse');
insert into Greenhouses values (3, 'Sahara Greenhouse');
insert into Greenhouses values (4, 'Prairie Greenhouse');
insert into Greenhouses values (5, 'Taiga Greenhouse');

/*table 7*/
insert into VisitPrices values (1, 30.0, 1);
insert into VisitPrices values (2, 45.0, 2);
insert into VisitPrices values (3, 20.0, 3);
insert into VisitPrices values (4, 50.0, 4);
insert into VisitPrices values (5, 15.0, 5);

/*table 8*/
insert into VisitTimes values (1, '1 hour', 1, 1);
insert into VisitTimes values (2, '2 hours', 2, 2);
insert into VisitTimes values (3, '1 hour 30 minutes', 3, 3);
insert into VisitTimes values (4, '3 hours 15 minutes', 4, 4);
insert into VisitTimes values (5, '45 minutes', 5, 5);

/*table 9*/
INSERT INTO Plants VALUES (1, '2022-03-15', 30.0, 1);
INSERT INTO Plants VALUES (2, '2022-03-16', 35.0, 2);
INSERT INTO Plants VALUES (3, '2022-03-17', 28.0, 1);
INSERT INTO Plants VALUES (4, '2022-03-18', 40.0, 3);
INSERT INTO Plants VALUES (5, '2022-03-19', 32.0, 2);

/*table 10*/
INSERT INTO PlantNutrientLevels VALUES (1, 10.0, 5.0, 8.0, 1);
INSERT INTO PlantNutrientLevels VALUES (2, 12.0, 6.0, 10.0, 2);
INSERT INTO PlantNutrientLevels VALUES (3, 8.0, 4.0, 6.0, 3);
INSERT INTO PlantNutrientLevels VALUES (4, 15.0, 7.0, 12.0, 4);
INSERT INTO PlantNutrientLevels VALUES (5, 11.0, 5.5, 9.0, 5);
/*table 11*/
insert into Species values (1, 'Amazonian Water Lily', 'Victoria amazonica', 1);
insert into Species values (2, 'Cerrado Water Lily', 'Victoria cerradoensis', 2);
insert into Species values (3, 'Saharan Water Lily', 'Victoria saharaensis', 3);
insert into Species values (4, 'Prairie Water Lily', 'Victoria prairiensis', 4);
insert into Species values (5, 'Taiga Water Lily', 'Victoria taigaensis', 5);

/*table 12*/
insert into PlantLifeCycles values (1, '2022-03-15', '2022-04-30', 1);
insert into PlantLifeCycles values (2, '2022-03-16', '2022-05-05', 2);
insert into PlantLifeCycles values (3, '2022-03-17', '2022-05-10', 3);
insert into PlantLifeCycles values (4, '2022-03-18', '2022-05-15', 4);
insert into PlantLifeCycles values (5, '2022-03-19', '2022-05-20', 5);

/*table 13*/

insert into PlantHarvests values (1, '2022-05-01', 1);
insert into PlantHarvests values (2, '2022-05-06', 2);
insert into PlantHarvests values (3, '2022-05-11', 3);
insert into PlantHarvests values (4, '2022-05-16', 4);
insert into PlantHarvests values (5, '2022-05-21', 5);

/*table 14*/
insert into Watering values (1, 1, '2022-05-01', 1, 1);
insert into Watering values (2, 2, '2022-05-06', 2, 2);
insert into Watering values (3, 3, '2022-05-11', 3, 3);
insert into Watering values (4, 4, '2022-05-16', 4, 4);
insert into Watering values (5, 5, '2022-05-21', 5, 5);

/*table 15*/
insert into Pesticides values (1, 'Pesticide 1', 1, 1, '2022-04-01');
insert into Pesticides values (2, 'Pesticide 2', 2, 2, '2022-04-06');
insert into Pesticides values (3, 'Pesticide 3', 3, 3, '2022-04-11');
insert into Pesticides values (4, 'Pesticide 4', 4, 4, '2022-04-16');
insert into Pesticides values (5, 'Pesticide 5', 5, 5, '2022-04-21');

/*table 16*/
insert into Photos values (1, '2022-04-01', 1, 1);
insert into Photos values (2, '2022-04-06', 2, 2);
insert into Photos values (3, '2022-04-11', 3, 3);
insert into Photos values (4, '2022-04-16', 4, 4);
insert into Photos values (5, '2022-04-21', 5, 5);

/*table 17*/
insert into Users values (1, 'Layla@gmail.com', 'password2004', 'Layla', '2022-04-01');
insert into Users values (2, 'Andra@yahoo.com', 'password2003', 'Andra', '2022-04-06');
insert into Users values (3, 'George@outlook.com', 'password2004', 'George', '2022-04-11');
insert into Users values (4, 'Ana@hotmail.com', 'password2004', 'Ana', '2022-04-16');
insert into Users values (5, 'Pirelli@pirelli.com', 'password1872', 'Pirelli', '2022-04-21');

/*table 18*/
insert into Workers values (1, 'Sofia Rodriguez', 'Horticulturist',7000, 2);
insert into Workers values (2, 'James Smith', 'Botanist',6500, 5);
insert into Workers values (3, 'Amina Khan', 'Garden Manager',6900, 3);
insert into Workers values (4, 'David Johnson', 'Field Worker',6200, 1);
insert into Workers values (5, 'Maria Garcia', 'Plant Scientist',7500, 4);

/*table 19*/
insert into WorkSchedule values (1, '2022-07-01', 8, 1);
insert into WorkSchedule values (2, '2022-07-02', 6, 2);
insert into WorkSchedule values (3, '2022-07-03', 7, 3);
insert into WorkSchedule values (4, '2022-07-04', 5, 4);
insert into WorkSchedule values (5, '2022-07-05', 4, 5);
/*table 20*/
insert into Visits values (1, 1,'2022-04-01' , 1);
insert into Visits values (2, 2, '2022-07-02', 2);
insert into Visits values (3, 3, '2022-05-18', 3);
insert into Visits values (4, 4, '2022-02-10', 4);
insert into Visits values (5, 5, '2022-06-04' ,5);