import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';


export const readCSV = (filePath: string): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    };

    export const getCSVFilePath = (fileName: string): string => {
        return path.join(__dirname, '..', 'data', fileName);
    };

    export const getDataForUser = async (filePath: string, userId: string) => {
        const data = await readCSV(filePath);
        return data.find(row => row.retirementData === userId);
    };

