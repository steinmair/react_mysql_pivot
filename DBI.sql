use school;

-- Zeil
-- Zwischensumme pro schulklasse
-- Zwischensumme pro Abteilung
-- gesamtsumme
-- select muss in groupby vorhanden sein

SELECT SCHOOLCLASS.DEPARTMENT_ID, DEPARTMENT.NAME_SHORT NAME_DEP,
       STUDENT.SCHOOLCLASS_ID, SCHOOLCLASS.NAME NAME_SC,
       (CASE WHEN STUDENT.SEX IS NOT NULL THEN SEX
        WHEN STUDENT.SEX IS NULL AND STUDENT.SCHOOLCLASS_ID IS NOT NULL THEN 'Anzahl Schulklasse'
         ELSE '' END ) SEX,
    --(CASE WHEN SCHOOLCLASS.NAME IS NOT NULL THEN NAME
      --    WHEN SCHOOLCLASS.NAME IS NULL AND SCHOOLCLASS.SCHOOLCLASS_ID IS NULL THEN 'Anzahl Abteilung'
        -- ELSE '' END ) NAME_SC,
       -- IFNULL(STUDENT.SEX,'Anzahl Schulklasse') SEX,
       COUNT(*) CNT,
       GROUPING(SCHOOLCLASS.DEPARTMENT_ID,DEPARTMENT.NAME_SHORT,
         STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME,STUDENT.SEX) GROUPING_ID
FROM STUDENT,
     SCHOOLCLASS,
     DEPARTMENT
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
AND SCHOOLCLASS.DEPARTMENT_ID = DEPARTMENT.DEPARTMENT_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,DEPARTMENT.NAME_SHORT,
         STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME,STUDENT.SEX WITH ROLLUP
HAVING GROUPING_ID NOT IN (3,15,31);
-- ORDER BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,STUDENT.SEX;

SELECT SCHOOLCLASS.DEPARTMENT_ID,
    STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME NAME_SC,
    COUNT(*) CNT,
    DENSE_RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY COUNT(*)) RANKING1
FROM STUDENT,
     SCHOOLCLASS
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME
ORDER BY SCHOOLCLASS.DEPARTMENT_ID,SCHOOLCLASS.NAME;


SELECT SCHOOLCLASS.DEPARTMENT_ID,
    STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME NAME_SC,
    COUNT(*) CNT,
    AVG(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) AVG
FROM STUDENT,
     SCHOOLCLASS
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME
ORDER BY SCHOOLCLASS.DEPARTMENT_ID,SCHOOLCLASS.NAME;

SELECT SCHOOLCLASS.DEPARTMENT_ID,
    STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME NAME_SC,
    COUNT(*) CNT,
    SUM(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) SUM
FROM STUDENT,
     SCHOOLCLASS
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME
ORDER BY SCHOOLCLASS.DEPARTMENT_ID,SCHOOLCLASS.NAME;

SELECT SCHOOLCLASS.DEPARTMENT_ID,
    STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME NAME_SC,
    COUNT(*) CNT,
    MIN(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) MIN,
    MAX(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) MAX
FROM STUDENT,
     SCHOOLCLASS
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME
ORDER BY SCHOOLCLASS.DEPARTMENT_ID,SCHOOLCLASS.NAME;

SELECT SCHOOLCLASS.DEPARTMENT_ID,
    STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME NAME_SC,
    COUNT(*) CNT,
    SUM(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) SUM,
    100 * COUNT(*) / (SUM(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID)) PERCENT1, -- pro department
    100 * COUNT(*) / (SUM(COUNT(*)) OVER ()) PERCENT2, -- gesamtanzahl OVER leer
    MIN(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) MIN,
    MAX(COUNT(*)) OVER (PARTITION BY DEPARTMENT_ID) MAX
FROM STUDENT,
     SCHOOLCLASS
WHERE STUDENT.SCHOOLCLASS_ID = SCHOOLCLASS.SCHOOLCLASS_ID
GROUP BY SCHOOLCLASS.DEPARTMENT_ID,STUDENT.SCHOOLCLASS_ID,SCHOOLCLASS.NAME
ORDER BY SCHOOLCLASS.DEPARTMENT_ID,SCHOOLCLASS.NAME;