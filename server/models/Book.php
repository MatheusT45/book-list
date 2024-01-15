<?php

namespace app\models;

use Yii;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "books".
 *
 * @property int $id
 * @property string|null $title
 * @property string|null $description
 * @property string|null $author
 * @property int|null $total_pages
 * @property string|null $created_at
 */
class Book extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'books';
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'updatedAtAttribute' => false,
            ],
            [
                'class' => BlameableBehavior::class,
                'updatedByAttribute' => false,
                'createdByAttribute' => false,
            ]
        ];
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'title' => 'title',
            'description' => 'description',
            'author' => 'author',
            'totalPages' => 'total_pages',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['description'], 'string'],
            [['total_pages', 'created_at'], 'integer'],
            [['title', 'author'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
            'author' => 'Author',
            'total_pages' => 'Total Pages',
            'created_at' => 'Created At',
        ];
    }
}
