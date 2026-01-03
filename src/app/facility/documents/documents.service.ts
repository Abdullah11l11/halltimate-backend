import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { CaseEntity } from '../cases/entities/case.entity';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(CaseEntity)
    private readonly caseRepository: Repository<CaseEntity>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const { prisonerId, caseId, uploadedBy, ...rest } = createDocumentDto;
    const prisoner = await this.loadPrisoner(prisonerId);
    const caseEntity = caseId ? await this.loadCase(caseId) : undefined;
    const uploader = await this.loadStaff(uploadedBy);

    const document = this.documentRepository.create({
      ...rest,
      prisoner,
      case: caseEntity,
      uploadedBy: uploader,
    });
    return this.documentRepository.save(document);
  }

  findAll(): Promise<Document[]> {
    return this.documentRepository.find({
      relations: ['prisoner', 'case', 'uploadedBy'],
      order: { uploadedAt: 'DESC' },
    });
  }

  async findOne(documentId: number): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { documentId },
      relations: ['prisoner', 'case', 'uploadedBy'],
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async update(
    documentId: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(documentId);
    const { prisonerId, caseId, uploadedBy, ...rest } = updateDocumentDto;

    if (prisonerId) {
      document.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (caseId !== undefined) {
      document.case = caseId ? await this.loadCase(caseId) : undefined;
    }

    if (uploadedBy) {
      document.uploadedBy = await this.loadStaff(uploadedBy);
    }

    Object.assign(document, rest);
    return this.documentRepository.save(document);
  }

  async remove(documentId: number): Promise<void> {
    const document = await this.findOne(documentId);
    await this.documentRepository.remove(document);
  }

  private async loadPrisoner(prisonerId: number): Promise<Prisoner> {
    const prisoner = await this.prisonerRepository.findOne({
      where: { prisonerId },
    });
    if (!prisoner) {
      throw new NotFoundException('Prisoner not found');
    }
    return prisoner;
  }

  private async loadCase(caseId: number): Promise<CaseEntity> {
    const caseEntity = await this.caseRepository.findOne({ where: { caseId } });
    if (!caseEntity) {
      throw new NotFoundException('Case not found');
    }
    return caseEntity;
  }

  private async loadStaff(staffId: number): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { staffId } });
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    return staff;
  }
}
