import { Request, Response } from "express";
import { IProblemService } from "../services/problem.service";


export interface IProblemController {
    createProblem(req:Request,res:Response) :Promise<void>;
    getProblemById(req:Request,res:Response) :Promise<void>;
    getAllProblems(req:Request,res:Response) :Promise<void>;
    updateProblem(req:Request,res:Response) :Promise<void>;
    deleteProblem(req:Request,res:Response) :Promise<void>;
    findByDifficulty(req:Request,res:Response) :Promise<void>;
    searchProblems(req:Request,res:Response) :Promise<void>;
}

export class ProblemController implements IProblemController {
    private problemService: IProblemService;

    constructor(problemService: IProblemService) {
        this.problemService = problemService
    }

    async createProblem(req:Request,res:Response): Promise<void>{
        const problem = await this.problemService.createProblem(req.body)

        res.status(201).json({
            message:"Problem created successfully",
            data:problem,
            success:true
        })
    }


    async getProblemById(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.getProblemById(req.params.id);

        res.status(200).json({
            messgae:"Problem fetched successfully",
            data:problem,
            sucess:true
        })
    }

    async getAllProblems(req: Request, res: Response): Promise<void> {
        const problems = await this.problemService.getAllProblems();

        res.status(200).json({
            message:"Problem fetched successfully",
            data:problems,
            success:true
        })
    }

    async updateProblem(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.updateProblem(req.params.id, req.body)

        res.status(200).json({
            message:"Problem updated successfully",
            data:problem,
            success:true
        })
    }

    async deleteProblem(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.deleteProblem(req.params.id)

        res.status(200).json({
            messgae:"Problem deleted successfully",
            data:problem,
            success:true
        })
    }

    async findByDifficulty(req: Request, res: Response): Promise<void> {

        const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
        
        const problem = await this.problemService.findByDifficulty(difficulty)

        res.status(200).json({
            messgae:"Problem fetched successfully",
            data:problem,
            success:true
        })
    }

    async searchProblems(req: Request, res: Response): Promise<void> {
        const problems = await this.problemService.searchProblems(req.query.query as string)
        res.status(200).json({
            messgae:"Problem fetched successfully",
            data:problems,
            success:true
        })
    }
}